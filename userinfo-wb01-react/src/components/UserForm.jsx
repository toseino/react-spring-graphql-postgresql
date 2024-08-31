import React from 'react';
import { Button, Input, Icon } from "@ui5/webcomponents-react";
import "@ui5/webcomponents-icons/dist/AllIcons.js";
import "../css/UserForm.css"

const UserForm = ({
    name,
    setName,
    address,
    setAddress,
    handleAddUser,
    deleteId,
    setDeleteId,
    handleDeleteUser
}) => {
    return (
        <div>
            {/* 登録 */}
            <div>
                <Button
                    className="custom-button"
                    icon="add-employee"
                    onClick={handleAddUser}
                    style={{ marginLeft: '10px' }}
                    disabled={!name.trim() || !address.trim()}
                >
                    登録
                </Button>
                <Input
                    icon={<Icon name="employee" />}
                    valueState="None"
                    type="text"
                    placeholder="名前"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <Input
                    icon={<Icon name="addresses" />}
                    valueState="None"
                    type="text"
                    placeholder="住所"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                />
            </div>
            
            {/* 削除 */}
            <div>
                <Button
                    className="custom-button"
                    icon="delete"
                    onClick={handleDeleteUser}
                    style={{ marginLeft: '10px' }}
                    disabled={deleteId.trim() === ""}
                >
                    削除
                </Button>
                <Input
                    icon={<Icon name="customer" />}
                    valueState="None"
                    type="Number"
                    placeholder="ユーザID"
                    value={deleteId}
                    onChange={(e) => setDeleteId(e.target.value)}
                />
            </div>
        </div>
    );
}

export default UserForm;