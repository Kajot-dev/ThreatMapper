import { useSuspenseQuery } from '@suspensive/react-query';
import { upperFirst } from 'lodash-es';
import { capitalize } from 'lodash-es';
import { ReactNode, Suspense, useMemo, useState } from 'react';
import {
  ActionFunctionArgs,
  Outlet,
  useFetcher,
  useSearchParams,
} from 'react-router-dom';
import { toast } from 'sonner';
import {
  Badge,
  Button,
  Combobox,
  ComboboxOption,
  createColumnHelper,
  Dropdown,
  DropdownItem,
  getRowSelectionColumn,
  RowSelectionState,
  SortingState,
  Table,
  TableSkeleton,
} from 'ui-components';

import { getRulesApiClient } from '@/api/api';
import { ModelSecretRule } from '@/api/generated';
import { DFLink } from '@/components/DFLink';
import { FilterBadge } from '@/components/filters/FilterBadge';
import { EllipsisIcon } from '@/components/icons/common/Ellipsis';
import { EyeHideSolid } from '@/components/icons/common/EyeHideSolid';
import { EyeSolidIcon } from '@/components/icons/common/EyeSolid';
import { FilterIcon } from '@/components/icons/common/Filter';
import { TimesIcon } from '@/components/icons/common/Times';
import { SeverityBadgeIcon } from '@/components/SeverityBadge';
import { TruncatedText } from '@/components/TruncatedText';
import { FilterWrapper } from '@/features/common/FilterWrapper';
import { invalidateAllQueries, queries } from '@/queries';
import { useTheme } from '@/theme/ThemeContext';
import { apiWrapper } from '@/utils/api';
import { formatMilliseconds } from '@/utils/date';
import { SeverityEnumList } from '@/utils/enum';
import { SeverityValueType } from '@/utils/enum';
import { getOrderFromSearchParams, getPageFromSearchParams } from '@/utils/table';
import { useSortingState } from '@/utils/table';

const DEFAULT_PAGE_SIZE = 25;

enum ActionEnumType {
  MASK_RULE = 'mask_rule',
  UNMASK_RULE = 'unmask_rule',
}

interface ActionData {
  action: ActionEnumType;
  success: boolean;
}

const action = async ({ request }: ActionFunctionArgs): Promise<ActionData> => {
  const formData = await request.formData();
  const ruleIds = (formData.getAll('ruleIds[]') ?? []) as string[];
  const actionType = formData.get('actionType');

  if (actionType === ActionEnumType.MASK_RULE) {
    const maskApi = apiWrapper({
      fn: getRulesApiClient().maskRules,
    });

    const response = await maskApi({
      modelRulesActionRequest: {
        rule_ids: ruleIds,
      },
    });
    if (!response.ok) {
      console.error('masking unsuccessful', response.error);
      toast.success('Masking failed.');
      return {
        action: actionType,
        success: false,
      };
    }
    toast.success('Masked successfully');
    invalidateAllQueries();
    return {
      action: actionType,
      success: true,
    };
  } else if (actionType === ActionEnumType.UNMASK_RULE) {
    const unmaskApi = apiWrapper({
      fn: getRulesApiClient().unmaskRules,
    });

    const response = await unmaskApi({
      modelRulesActionRequest: {
        rule_ids: ruleIds,
      },
    });
    if (!response.ok) {
      console.error('unmasking unsuccessful', response.error);
      toast.success('Unmasking failed.');
      return {
        action: actionType,
        success: false,
      };
    }
    toast.success('Unmasked successfully');
    invalidateAllQueries();
    return {
      action: actionType,
      success: true,
    };
  }
  throw new Error(`invalid action type ${actionType}.`);
};

function useSecretRules() {
  const [searchParams] = useSearchParams();

  return useSuspenseQuery({
    ...queries.search.secretRulesWithPagination({
      pageSize: parseInt(searchParams.get('size') ?? String(DEFAULT_PAGE_SIZE)),
      page: getPageFromSearchParams(searchParams),
      order: getOrderFromSearchParams(searchParams),
      masked: searchParams.getAll('masked').map((value) => value === 'masked'),
      severity: searchParams.getAll('severity'),
    }),
    keepPreviousData: true,
  });
}

const BulkActions = ({
  selectedRows,
  onBulkAction,
}: {
  selectedRows: string[];
  onBulkAction: (selectedRows: string[], actionType: ActionEnumType) => void;
}) => {
  return (
    <>
      <Button
        color="default"
        variant="flat"
        size="sm"
        startIcon={<EyeSolidIcon />}
        disabled={!selectedRows.length}
        type="button"
        onClick={(e) => {
          e.preventDefault();
          onBulkAction(selectedRows, ActionEnumType.MASK_RULE);
        }}
      >
        Mask
      </Button>
      <Button
        color="default"
        variant="flat"
        size="sm"
        startIcon={<EyeHideSolid />}
        disabled={!selectedRows.length}
        type="button"
        onClick={(e) => {
          e.preventDefault();
          onBulkAction(selectedRows, ActionEnumType.UNMASK_RULE);
        }}
      >
        Unmask
      </Button>
    </>
  );
};

const ActionDropdown = ({
  trigger,
  onTableAction,
  masked,
  ruleId,
}: {
  ruleId: string;
  masked: boolean;
  trigger: ReactNode;
  onTableAction: (row: string, actionType: ActionEnumType) => void;
}) => {
  return (
    <Dropdown
      triggerAsChild={true}
      align={'start'}
      content={
        <>
          {masked ? (
            <DropdownItem
              onSelect={() => onTableAction(ruleId, ActionEnumType.UNMASK_RULE)}
            >
              Unmask rule
            </DropdownItem>
          ) : (
            <DropdownItem
              onSelect={() => onTableAction(ruleId, ActionEnumType.MASK_RULE)}
            >
              Mask rule
            </DropdownItem>
          )}
        </>
      }
    >
      {trigger}
    </Dropdown>
  );
};

const FeedsTable = ({
  rowSelectionState,
  setRowSelectionState,
  onTableAction,
}: {
  rowSelectionState: RowSelectionState;
  setRowSelectionState: React.Dispatch<React.SetStateAction<RowSelectionState>>;
  onTableAction: (row: string, actionType: ActionEnumType) => void;
}) => {
  const columnHelper = createColumnHelper<ModelSecretRule>();
  const [searchParams, setSearchParams] = useSearchParams();
  const { data } = useSecretRules();
  const { mode: theme } = useTheme();
  const [sort, setSort] = useSortingState();

  const columns = useMemo(() => {
    const columns = [
      getRowSelectionColumn(columnHelper, {
        size: 30,
        minSize: 30,
        maxSize: 30,
      }),
      columnHelper.display({
        id: 'actions',
        enableSorting: false,
        cell: (cell) => (
          <ActionDropdown
            onTableAction={onTableAction}
            masked={cell.row.original.masked}
            ruleId={cell.row.original.rule_id ?? ''}
            trigger={
              <button className="h-[16px] w-[16px] text-text-text-and-icon rotate-90">
                <EllipsisIcon />
              </button>
            }
          />
        ),
        header: () => '',
        size: 30,
        minSize: 30,
        maxSize: 30,
        enableResizing: false,
      }),
      columnHelper.accessor('rule_id', {
        header: () => 'Rule ID',
        cell: (info) => {
          const ruleId = info.getValue() ?? '';

          return (
            <DFLink
              to={{
                pathname: `./${encodeURIComponent(ruleId)}`,
                search: searchParams.toString(),
              }}
              className="flex items-center gap-x-[6px]"
            >
              <TruncatedText text={ruleId.replace('secret-', '')} />
            </DFLink>
          );
        },
        size: 120,
        minSize: 40,
        maxSize: 150,
        enableSorting: false,
      }),
      columnHelper.accessor('summary', {
        header: () => 'Summary',
        cell: (info) => {
          const value = info.getValue();
          return <TruncatedText text={value?.length ? value : '-'} />;
        },
        size: 200,
        minSize: 50,
        maxSize: 250,
        enableSorting: false,
      }),
      columnHelper.accessor('severity', {
        header: () => 'Severity',
        cell: (info) => {
          const value = info.getValue();
          if (!value?.length) return '-';
          return (
            <div className="flex items-center gap-x-2">
              <SeverityBadgeIcon
                severity={info.getValue() as SeverityValueType}
                theme={theme}
                className="w-[18px] h-[18px]"
              />
              {upperFirst(info.getValue())}
            </div>
          );
        },
        size: 120,
        minSize: 30,
        maxSize: 150,
        enableSorting: true,
      }),
      columnHelper.accessor('updated_at', {
        header: () => 'Updated at',
        cell: (info) => {
          return info.getValue() ? (
            <TruncatedText text={formatMilliseconds(info.getValue())} />
          ) : (
            '-'
          );
        },
        size: 120,
        minSize: 30,
        maxSize: 150,
        enableSorting: false,
      }),
    ];

    return columns;
  }, [theme, searchParams]);

  return (
    <Table
      data={data.rules ?? []}
      columns={columns}
      enablePagination
      manualPagination
      totalRows={data.totalRows}
      pageSize={parseInt(searchParams.get('size') ?? String(DEFAULT_PAGE_SIZE))}
      pageIndex={data.currentPage}
      onPaginationChange={(updaterOrValue) => {
        let newPageIndex = 0;
        if (typeof updaterOrValue === 'function') {
          newPageIndex = updaterOrValue({
            pageIndex: data.currentPage,
            pageSize: parseInt(searchParams.get('size') ?? String(DEFAULT_PAGE_SIZE)),
          }).pageIndex;
        } else {
          newPageIndex = updaterOrValue.pageIndex;
        }
        setSearchParams((prev) => {
          prev.set('page', String(newPageIndex));
          return prev;
        });
      }}
      enablePageResize
      onPageResize={(newSize) => {
        setSearchParams((prev) => {
          prev.set('size', String(newSize));
          prev.delete('page');
          return prev;
        });
      }}
      getRowId={(row) => {
        return row.rule_id ?? '';
      }}
      enableColumnResizing
      enableRowSelection
      rowSelectionState={rowSelectionState}
      onRowSelectionChange={setRowSelectionState}
      getTrProps={(row) => {
        if (row.original.masked) {
          return {
            className: 'opacity-40',
          };
        }
        return {};
      }}
      enableSorting
      manualSorting
      sortingState={sort}
      onSortingChange={(updaterOrValue) => {
        let newSortState: SortingState = [];
        if (typeof updaterOrValue === 'function') {
          newSortState = updaterOrValue(sort);
        } else {
          newSortState = updaterOrValue;
        }
        setSearchParams((prev) => {
          if (!newSortState.length) {
            prev.delete('sortby');
            prev.delete('desc');
          } else {
            prev.set('sortby', String(newSortState[0].id));
            prev.set('desc', String(newSortState[0].desc));
          }
          return prev;
        });
        setSort(newSortState);
      }}
    />
  );
};

const FILTER_SEARCHPARAMS: Record<string, string> = {
  masked: 'Masked/Unmasked',
  severity: 'Severity',
};

const getPrettyNameForAppliedFilters = ({
  key,
  value,
}: {
  key: string;
  value: string;
}) => {
  switch (key) {
    case 'severity':
      return capitalize(value);
    case 'masked':
      return capitalize(value);
    default:
      return value;
  }
};

const getAppliedFiltersCount = (searchParams: URLSearchParams) => {
  return Object.keys(FILTER_SEARCHPARAMS).reduce((prev, curr) => {
    return prev + searchParams.getAll(curr).length;
  }, 0);
};

const Filters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [maskedQuery, setMaskedQuery] = useState('');
  const [severityQuery, setSeverityQuery] = useState('');
  const appliedFilterCount = getAppliedFiltersCount(searchParams);

  return (
    <FilterWrapper>
      <div className="flex gap-2">
        <Combobox
          getDisplayValue={() => FILTER_SEARCHPARAMS['masked']}
          multiple
          value={searchParams.getAll('masked')}
          onChange={(values) => {
            setSearchParams((prev) => {
              prev.delete('masked');
              values.forEach((value) => {
                prev.append('masked', value);
              });
              prev.delete('page');
              return prev;
            });
          }}
          onQueryChange={(query) => {
            setMaskedQuery(query);
          }}
          clearAllElement="Clear"
          onClearAll={() => {
            setSearchParams((prev) => {
              prev.delete('masked');
              prev.delete('page');
              return prev;
            });
          }}
        >
          {['masked', 'unmasked']
            .filter((item) => {
              if (!maskedQuery.length) return true;
              return item.includes(maskedQuery.toLowerCase());
            })
            .map((item) => {
              return (
                <ComboboxOption key={item} value={item}>
                  {capitalize(item)}
                </ComboboxOption>
              );
            })}
        </Combobox>
        <Combobox
          getDisplayValue={() => FILTER_SEARCHPARAMS['severity']}
          multiple
          value={searchParams.getAll('severity')}
          onChange={(values) => {
            setSearchParams((prev) => {
              prev.delete('severity');
              values.forEach((value) => {
                prev.append('severity', value);
              });
              prev.delete('page');
              return prev;
            });
          }}
          onQueryChange={(query) => {
            setSeverityQuery(query);
          }}
          clearAllElement="Clear"
          onClearAll={() => {
            setSearchParams((prev) => {
              prev.delete('severity');
              prev.delete('page');
              return prev;
            });
          }}
        >
          {SeverityEnumList.filter((item) => {
            if (!severityQuery.length) return true;
            return item.includes(severityQuery.toLowerCase());
          }).map((item) => {
            return (
              <ComboboxOption key={item} value={item}>
                {capitalize(item)}
              </ComboboxOption>
            );
          })}
        </Combobox>
      </div>
      {appliedFilterCount > 0 ? (
        <div className="flex gap-2.5 mt-4 flex-wrap items-center">
          {Array.from(searchParams)
            .filter(([key]) => {
              return Object.keys(FILTER_SEARCHPARAMS).includes(key);
            })
            .map(([key, value]) => {
              return (
                <FilterBadge
                  key={`${key}-${value}`}
                  onRemove={() => {
                    setSearchParams((prev) => {
                      const existingValues = prev.getAll(key);
                      prev.delete(key);
                      existingValues.forEach((existingValue) => {
                        if (existingValue !== value) prev.append(key, existingValue);
                      });
                      prev.delete('page');
                      return prev;
                    });
                  }}
                  text={`${FILTER_SEARCHPARAMS[key]}: ${getPrettyNameForAppliedFilters({ key, value })}`}
                />
              );
            })}
          <Button
            variant="flat"
            color="default"
            startIcon={<TimesIcon />}
            onClick={() => {
              setSearchParams((prev) => {
                Object.keys(FILTER_SEARCHPARAMS).forEach((key) => {
                  prev.delete(key);
                });
                prev.delete('page');
                return prev;
              });
            }}
            size="sm"
          >
            Clear all
          </Button>
        </div>
      ) : null}
    </FilterWrapper>
  );
};

const SecretFeeds = () => {
  const [rowSelectionState, setRowSelectionState] = useState<RowSelectionState>({});
  const fetcher = useFetcher<ActionData>();
  const [searchParams] = useSearchParams();
  const [filtersExpanded, setFiltersExpanded] = useState(false);

  const selectedRows = useMemo<string[]>(() => {
    return Object.keys(rowSelectionState);
  }, [rowSelectionState]);

  const onTableAction = (row: string, actionType: string) => {
    if (
      actionType === ActionEnumType.MASK_RULE ||
      actionType === ActionEnumType.UNMASK_RULE
    ) {
      const formData = new FormData();
      formData.append('actionType', actionType);
      formData.append('ruleIds[]', row);
      fetcher.submit(formData, {
        method: 'post',
      });
    }
  };

  const onBulkAction = (rows: string[], actionType: string) => {
    if (
      actionType === ActionEnumType.MASK_RULE ||
      actionType === ActionEnumType.UNMASK_RULE
    ) {
      const formData = new FormData();
      formData.append('actionType', actionType);
      rows.forEach((row) => {
        formData.append('ruleIds[]', row);
      });
      fetcher.submit(formData, {
        method: 'post',
      });
    }
  };

  return (
    <>
      <div className="mt-2">
        <h6 className="text-h6 text-text-input-value">Secret rules management</h6>
      </div>
      <div className="h-12 flex items-center">
        <BulkActions selectedRows={selectedRows} onBulkAction={onBulkAction} />
        <Button
          variant="flat"
          className="ml-auto"
          startIcon={<FilterIcon />}
          endIcon={
            getAppliedFiltersCount(searchParams) > 0 ? (
              <Badge
                label={String(getAppliedFiltersCount(searchParams))}
                variant="filled"
                size="small"
                color="blue"
              />
            ) : null
          }
          size="sm"
          onClick={() => {
            setFiltersExpanded((prev) => !prev);
          }}
          data-testid="filterButtonIdForTable"
        >
          Filter
        </Button>
      </div>
      {filtersExpanded ? <Filters /> : null}
      <div className="mb-2">
        <Suspense fallback={<TableSkeleton columns={7} rows={25} />}>
          <FeedsTable
            rowSelectionState={rowSelectionState}
            setRowSelectionState={setRowSelectionState}
            onTableAction={onTableAction}
          />
        </Suspense>
      </div>
      <Outlet />
    </>
  );
};

export const module = {
  element: <SecretFeeds />,
  action,
};
