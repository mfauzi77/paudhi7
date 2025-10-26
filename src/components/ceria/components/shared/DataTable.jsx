import React from 'react';

const DataTable = ({ headers, data }) => {
    return (
        <div className="overflow-x-auto">
            <table className="w-full text-sm">
                <thead className="bg-slate-100">
                    <tr>
                        {headers.map((header, index) => (
                            <th key={index} className="px-3 py-2 text-left font-semibold text-slate-700 border-b">
                                {header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.slice(0, 10).map((row, rowIndex) => (
                        <tr key={rowIndex} className="border-b hover:bg-slate-50">
                            {headers.map((header, colIndex) => (
                                <td key={colIndex} className="px-3 py-2 text-slate-600">
                                    {row[header] || '-'}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
            {data.length > 10 && (
                <div className="text-center py-2 text-xs text-slate-500">
                    Menampilkan 10 dari {data.length} baris
                </div>
            )}
        </div>
    );
};

export default DataTable;
