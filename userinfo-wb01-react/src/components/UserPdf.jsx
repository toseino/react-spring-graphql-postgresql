import React from 'react';
import { BlobProvider } from '@react-pdf/renderer';
import UserListPdf from '../components/UserListPdf';
import { Button } from "@ui5/webcomponents-react";
import handleOpenPdf from '../utils/handleOpenPdf';

const UserPdf = ({ users }) => {
    return (
        <BlobProvider document={<UserListPdf users={users} />} fileName="user-list.pdf">
            {({ blob, url, loading }) =>
                loading ? (
                    "ロード中..."
                ) : (
                    <Button
                        design="Attention"
                        icon="pdf-attachment"
                        onClick={() => handleOpenPdf(url)}
                    >
                        ダウンロード
                    </Button>
                )
            }
        </BlobProvider>
    );
}

export default UserPdf;