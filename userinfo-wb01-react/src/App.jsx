import React, { useState, useEffect, useCallback } from "react";
import { request } from "graphql-request";
import { Bar, Icon, Title } from "@ui5/webcomponents-react";
import UserForm from "./components/UserForm";
import UserTable from "./components/UserTable";
import UserPdf from "./components/UserPdf";
import { GET_USERS } from "./graphql/queries";
import { ADD_USER, DELETE_USER } from "./graphql/mutations";

const endpoint = "http://localhost:8081/graphql";

function App() {
    const [users, setUsers] = useState([]);
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [deleteId, setDeleteId] = useState("");
    const [listLoading, setListLoading] = useState(false);

    //ユーザ一覧の取得
    const fetchUsers = useCallback(async () => {
        setListLoading(false);
        try {
            //GraphQL Query
            const data = await request(endpoint, GET_USERS);
            setUsers(data.users);
        } catch (error) {
            console.error("エラー：ユーザ一覧表示失敗:", error);
        } finally {
            setListLoading(true);
        }
    }, []);

    //ページ参照時に実行
    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);

    //登録
    const handleAddUser = async () => {
        if (!name || !address) {
            console.error("エラー：name若しくはaddressがnull");
            return;
        }

        try {
            //GraphQL Mutation
            const data = await request(endpoint, ADD_USER, { name, address });
            setUsers([...users, data.addUser]);
            setName("");
            setAddress("");
            fetchUsers();
        } catch (error) {
            console.error("エラー：ユーザ登録失敗:", error);
        }
    };

    //削除
    const handleDeleteUser = async () => {
        if (!deleteId) {
            console.error("エラー：idがnull");
            return;
        }

        const userExists = users.some(user => user.id === deleteId);
        if (!userExists) {
            alert("エラー：入力値が誤っています");
            return;
        }

        const confirmed = window.confirm("本当にこのユーザーを削除してもよろしいですか？");
        if (!confirmed) {
            return;
        }

        try {
            //GraphQL Mutation
            const data = await request(endpoint, DELETE_USER, { id: deleteId });
            if (data.deleteUser) {
                setUsers(users.filter(user => user.id !== deleteId));
                setDeleteId("");
            }
            fetchUsers();
        } catch (error) {
            console.error("エラー：ユーザ削除失敗:", error);
        }
    };

    return (
        <div>
            <Bar startContent={
                <>
                    <Icon name="account" />
                    <Title>ユーザ情報一覧</Title>
                </>
            } />

            {/* 入力フォーム */}
            <UserForm
                name={name}
                setName={setName}
                address={address}
                setAddress={setAddress}
                handleAddUser={handleAddUser}
                deleteId={deleteId}
                setDeleteId={setDeleteId}
                handleDeleteUser={handleDeleteUser}
            />

            {/* PDF出力 */}
            <UserPdf users={users} />

            {/* ユーザ一覧 */}
            <UserTable users={users} listLoading={listLoading} />
        </div>
    );
}

export default App;