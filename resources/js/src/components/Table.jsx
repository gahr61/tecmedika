const Table = ({
    columns,
    data
})=>{
    return(
        <table>
            <thead>
                <tr>
                    {columns.map((column, index)=>
                        column.show && (
                            <th key={index}>{column.label}</th>
                        )                        
                    )}
                </tr>
            </thead>
            <tbody>
                {data.map((d, index)=>
                    <tr key={index}>
                        {columns.map((col, index1)=>(
                            col.show && (
                                <td key={index1}>
                                    {col.selector(d)}
                                </td>
                            )
                        ))}
                    </tr>
                )}
            </tbody>
        </table>
    )
}

export default Table;

Table.defaultProps = {
    columns: [],
    data: []
}