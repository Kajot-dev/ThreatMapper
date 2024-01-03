import { useSuspenseQuery } from '@suspensive/react-query';
import { Suspense, useMemo, useState } from 'react';
import { Outlet, useSearchParams } from 'react-router-dom';
import { cn } from 'tailwind-preset';
import {
  Card,
  CircleSpinner,
  createColumnHelper,
  SlidingModal,
  SlidingModalCloseButton,
  SlidingModalContent,
  SlidingModalHeader,
  Table,
  TableNoDataElement,
  TableSkeleton,
  Tabs,
} from 'ui-components';

import { ModelVulnerability } from '@/api/generated';
import { DFLink } from '@/components/DFLink';
import { ArrowLine } from '@/components/icons/common/ArrowLine';
import { PopOutIcon } from '@/components/icons/common/PopOut';
import { CveCVSSScore, SeverityBadge } from '@/components/SeverityBadge';
import { VulnerabilityIcon } from '@/components/sideNavigation/icons/Vulnerability';
import { TruncatedText } from '@/components/TruncatedText';
import { queries } from '@/queries';
import { formatMilliseconds } from '@/utils/date';
import { abbreviateNumber } from '@/utils/number';

const DEFAULT_PAGE_SIZE = 10;

interface IScanCompareProps {
  baseScanId: string;
  toScanId: string;
  baseScanTime: number;
  toScanTime: number;
}
const useGetScanDiff = (props: { baseScanId: string; toScanId: string }) => {
  const { baseScanId, toScanId } = props;

  return useSuspenseQuery({
    ...queries.vulnerability.scanDiff({
      baseScanId,
      toScanId,
    }),
  });
};

const CompareTable = (props: IScanCompareProps & { type: string }) => {
  const { data } = useGetScanDiff({
    baseScanId: props.baseScanId,
    toScanId: props.toScanId,
  });

  const tableData = props.type === 'new' ? data.added : data.deleted;

  const [searchParams, setSearchParams] = useSearchParams();

  const columnHelper = createColumnHelper<ModelVulnerability>();
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);

  const columns = useMemo(() => {
    const columns = [
      columnHelper.accessor('cve_id', {
        cell: (info) => (
          <DFLink
            to={{
              pathname: `./${encodeURIComponent(info.row.original.node_id)}`,
              search: searchParams.toString(),
            }}
            className="flex items-center gap-x-[6px]"
          >
            <div className="w-4 h-4 shrink-0 dark:text-text-text-and-icon">
              <VulnerabilityIcon />
            </div>
            <div className="truncate">{info.getValue()}</div>
          </DFLink>
        ),
        header: () => 'CVE ID',
        minSize: 120,
        size: 130,
        maxSize: 140,
      }),
      columnHelper.accessor('cve_caused_by_package', {
        cell: (info) => info.getValue(),
        header: () => 'Package',
        minSize: 120,
        size: 130,
        maxSize: 140,
      }),
      columnHelper.accessor('cve_cvss_score', {
        cell: (info) => (
          <div>
            <CveCVSSScore score={info.getValue()} />
          </div>
        ),
        header: () => <TruncatedText text="CVSS Score" />,
        minSize: 50,
        size: 60,
        maxSize: 60,
      }),
      columnHelper.accessor('cve_severity', {
        cell: (info) => (
          <div>
            <SeverityBadge severity={info.getValue()} />
          </div>
        ),
        header: () => 'Severity',
        minSize: 70,
        size: 80,
        maxSize: 90,
      }),
      columnHelper.accessor('cve_link', {
        enableSorting: false,
        cell: (info) => {
          if (!info.getValue().length) return '-';
          return (
            <DFLink to={info.getValue()} target="_blank" rel="noopener noreferrer">
              <div className="h-[16px] w-[16px]">
                <PopOutIcon />
              </div>
            </DFLink>
          );
        },
        header: () => 'Link',
        minSize: 40,
        size: 40,
        maxSize: 45,
        enableResizing: false,
      }),
    ];

    return columns;
  }, [setSearchParams]);
  return (
    <div className="mt-4">
      <Table
        size="default"
        data={tableData}
        columns={columns}
        enablePagination
        enableColumnResizing
        enableSorting
        getTrProps={(row) => {
          if (row.original.masked) {
            return {
              className: 'opacity-40',
            };
          }
          return {};
        }}
        enablePageResize
        pageSize={pageSize}
        onPageResize={(newSize) => {
          setPageSize(newSize);
        }}
        noDataElement={<TableNoDataElement text="No data available" />}
      />
    </div>
  );
};

const CompareCountWidget = ({
  title,
  type,
  baseScanId,
  toScanId,
}: {
  title: string;
  type: string;
  baseScanId: string;
  toScanId: string;
}) => {
  const { data } = useGetScanDiff({
    baseScanId,
    toScanId,
  });

  const isDeleted = type === 'deleted';

  const counts = !isDeleted ? data.added : data.deleted;

  return (
    <div className="flex flex-col  dark:text-text-text-and-icon items-center">
      <div className="flex flex-col gap-y-1.5">
        <span className="text-p1">{title}</span>
        <div className="flex flex-1 max-w-[160px] dark:text-text-input-value items-baseline">
          <>
            <div
              className={cn('h-5 w-5', {
                'text-status-success rotate-180': isDeleted,
                'text-status-error': !isDeleted,
              })}
            >
              <ArrowLine />
            </div>

            <span className="text-h1 dark:text-text-input pl-1.5">
              {abbreviateNumber(counts.length)}
            </span>
          </>
        </div>
      </div>
    </div>
  );
};

const CountWidget = (props: {
  title: string;
  type: string;
  baseScanId: string;
  toScanId: string;
}) => {
  return (
    <Card className="mt-4 max-h-[130px] px-4 py-2.5 flex items-center">
      <div className="flex-1 pl-4">
        <Suspense
          fallback={
            <div className="flex items-center justify-center min-h-[120px]">
              <CircleSpinner size="md" />
            </div>
          }
        >
          <CompareCountWidget {...props} />
        </Suspense>
      </div>
    </Card>
  );
};

const ScanComapareTime = ({ baseScanTime, toScanTime }: IScanCompareProps) => {
  return (
    <div className="px-1.5 flex items-center h-12">
      <div className="dark:text-text-text-and-icon text-p4 flex gap-x-1">
        Comparing scan{' '}
        <span className="dark:text-text-input-value text-p4">
          {formatMilliseconds(baseScanTime)}
        </span>{' '}
        with{' '}
        <span className="dark:text-text-input-value text-p4">
          {formatMilliseconds(toScanTime)}
        </span>
      </div>
    </div>
  );
};
const tabs = [
  {
    label: 'New vulnerabilities ',
    value: 'new-vulnerabilities',
  },
  {
    label: 'Fixed vulnerabilities',
    value: 'deleted-vulnerabilities',
  },
];
export const VulnerabilitiesCompare = ({
  open,
  onOpenChange,
  compareInput,
}: {
  open: boolean;
  onOpenChange: (state: boolean) => void;
  compareInput: IScanCompareProps;
}) => {
  const [tab, setTab] = useState<'new-vulnerabilities' | 'deleted-vulnerabilities'>(
    'new-vulnerabilities',
  );
  return (
    <>
      <SlidingModal
        open={open}
        onOpenChange={(state) => {
          if (onOpenChange) {
            onOpenChange(state);
          }
        }}
        size="l"
      >
        <SlidingModalCloseButton />
        <SlidingModalHeader>
          <div className="p-4 text-h3 text-text-text-and-icon bg-bg-header">
            <div className="overflow-hidden">
              <TruncatedText text="Scan comparision" />
            </div>
          </div>
        </SlidingModalHeader>
        <SlidingModalContent>
          <div className="mx-4">
            <ScanComapareTime {...compareInput} />
            <Tabs
              value={tab}
              defaultValue={tab}
              tabs={tabs}
              onValueChange={(v) => {
                setTab(v as any);
              }}
            >
              {tab === 'new-vulnerabilities' && (
                <>
                  <CountWidget
                    title="Total new vulnerabilities"
                    type="new"
                    baseScanId={compareInput.baseScanId}
                    toScanId={compareInput.toScanId}
                  />
                  <Suspense
                    fallback={<TableSkeleton columns={7} rows={DEFAULT_PAGE_SIZE} />}
                  >
                    <CompareTable {...compareInput} type="new" />
                  </Suspense>
                </>
              )}
              {tab === 'deleted-vulnerabilities' && (
                <>
                  <CountWidget
                    title="Total fixed vulnerabilities"
                    type="deleted"
                    baseScanId={compareInput.baseScanId}
                    toScanId={compareInput.toScanId}
                  />
                  <Suspense
                    fallback={<TableSkeleton columns={7} rows={DEFAULT_PAGE_SIZE} />}
                  >
                    <CompareTable {...compareInput} type="deleted" />
                  </Suspense>
                </>
              )}
            </Tabs>
          </div>
          <Outlet />
        </SlidingModalContent>
      </SlidingModal>
    </>
  );
};
