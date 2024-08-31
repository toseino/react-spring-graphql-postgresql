import React from 'react';
import { Table, TableHeaderRow, TableHeaderCell, TableRow, TableCell, Icon } from "@ui5/webcomponents-react";

const UserTable = ({ users, listLoading }) => {
    return (
        <div style={{ height: '400px', overflowY: 'auto' }}>
            <Table
                headerRow={
                    <TableHeaderRow sticky>
                        <TableHeaderCell width="auto">
                            <span style={{ marginRight: "5px" }}>ID</span><Icon name="customer" />
                        </TableHeaderCell>
                        <TableHeaderCell minWidth="auto">
                            <span style={{ marginRight: "5px" }}>名前</span><Icon name="employee" />
                        </TableHeaderCell>
                        <TableHeaderCell minWidth="auto">
                            <span style={{ marginRight: "5px" }}>住所</span><Icon name="addresses" />
                        </TableHeaderCell>
                    </TableHeaderRow>}
                onRowClick={() => {}}
                loading={!listLoading}
            >
                {users.map((user) => (
                    <TableRow key={user.id}>
                        <TableCell>{user.id}</TableCell>
                        <TableCell>{user.name}</TableCell>
                        <TableCell>{user.address}</TableCell>
                    </TableRow>
                ))}
            </Table>
        </div>
    );
}

export default UserTable;