import {ReactNode, useEffect, useState} from 'react';
import Spinner from '../spinner';
import {FaArrowDown, FaArrowsUpDown, FaArrowUp} from 'react-icons/fa6';
import BootstrapTable from 'react-bootstrap/Table'
import {ErrorAlert} from "@consuri/core-ui-components";


interface TableData<T> {
    itemKey: keyof T;
    noDataMsg: string;
    errorMsg: string;
    status: 'idle' | 'error' | 'loading' | 'success';
    data: T[] | undefined;
    onRowClick?: (item: T) => void;
    forceDataReload?: (sortBy: keyof T, sortDirection: 'ASC' | 'DESC') => void;
    footers?: { footerIdentifier: string, title: string }[];
    columns: {
        identifier: string,
        title: string,
        dataField?: keyof T,
        getter?: (fieldValue: T, rowIndex: number, columnIndex: number) => ReactNode,
        sortable?: boolean,
        footer?: (columnIdentifier: string) => ReactNode
    }[];
}


const SortableIcon = ({sortable, sort}: { sortable: boolean, sort: 'ASC' | 'DESC' | undefined }) => {
    if (!sortable) {
        return null;
    } else if (sort === 'ASC') {
        return <FaArrowDown/>;
    } else if (sort === 'DESC') {
        return <FaArrowUp/>;
    } else {
        return <FaArrowsUpDown/>;
    }
};

const EbookTable = <T, >(props: TableData<T>) => {
    const [sort, setSort] = useState<{ key: keyof T | undefined, directionAsc: boolean }>({
        key: undefined,
        directionAsc: true
    });

    useEffect(() => {
        if (sort.key && props.forceDataReload) {
            props.forceDataReload(sort.key, sort.directionAsc ? 'ASC' : 'DESC');
        }
    }, [sort.key, sort.directionAsc]);

    return <>
        <BootstrapTable>
            <thead>
            <tr>
                {props.columns.map(eachColumn => {
                    return <th className={`p-3 fs-md`}
                               key={eachColumn.identifier}
                               onClick={() => {
                                   let newSort;
                                   if (sort.key === eachColumn.dataField) {
                                       newSort = {...sort, directionAsc: !sort.directionAsc};
                                   } else {
                                       newSort = {key: eachColumn.dataField, directionAsc: !sort.directionAsc};
                                   }
                                   if (newSort.key !== sort.key || newSort.directionAsc !== sort.directionAsc) {
                                       setSort(newSort);
                                   }
                               }}
                        // cursor={eachColumn.sortable ? 'pointer' : undefined}
                    >
                        {eachColumn.title}
                        <SortableIcon sortable={!!eachColumn.sortable}
                                      sort={sort.key === eachColumn.dataField ? (sort.directionAsc ? 'ASC' : 'DESC') : undefined}/>
                    </th>;
                })
                }
            </tr>
            </thead>
            <tbody>
            {(!props.data || props.data.length === 0) && (
                <tr className='border-0'>
                    <td colSpan={props.columns.length} className='info-cell'>
                        {props.status === 'loading' ? (
                            <Spinner/>
                        ) : props.status === 'error' ? (
                            <ErrorAlert errorText={props.errorMsg}/>
                        ) : (
                            <span className='text-muted fs-sm'>{props.noDataMsg}</span>
                        )}
                    </td>
                </tr>
            )}
            {props.data && props.data.map((eachDataItem, rowIndex) => {
                const rowKey = eachDataItem[props.itemKey];
                return <tr key={`row_${rowKey}`} onClick={() => {
                    if (props.onRowClick) {
                        props.onRowClick(eachDataItem);
                    }
                }}>
                    {props.columns
                        .map((eachColumn, columnIndex) => {
                            const key = `row_${rowKey}_col_${eachColumn.identifier}`;
                            if (eachColumn.getter) {
                                const content = eachColumn.getter(eachDataItem, rowIndex, columnIndex);
                                return <td key={`get_${key}`}>{content}</td>;
                            } else if (eachColumn.dataField) {
                                const value = eachDataItem[eachColumn.dataField] ? `${eachDataItem[eachColumn.dataField]}` : '';
                                return <td key={`datafield_${key}`}>{value}</td>;
                            } else {
                                return <td key={`nodata_${key}`}>No data</td>;
                            }
                        })
                    }
                </tr>;
            })}
            {props.footers && props.footers.map(eachFooter => {
                return <tr key={`row_footer_${eachFooter.footerIdentifier}`}>
                    {props.columns.map(eachColumn => {
                        if (eachColumn.footer !== undefined) {
                            const content = eachColumn.footer ? eachColumn.footer(eachFooter.footerIdentifier) : null;
                            return <td
                                key={`row_footer_${eachFooter.footerIdentifier}_${eachColumn.identifier}`}>{content}</td>;
                        } else {
                            return <td
                                key={`row_footer_${eachFooter.footerIdentifier}_${eachColumn.identifier}`}/>;
                        }
                    })}
                </tr>;

            })}
            </tbody>
        </BootstrapTable>
    </>;
};


export default EbookTable;
