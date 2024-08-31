// UserListPdf.jsx
import React from 'react';
import { Page, Text, View, Document, StyleSheet, Font  } from '@react-pdf/renderer';

// 日本語フォント登録
Font.register({
    family: 'NotoSansJP',
    src: '/NotoSansJP-VariableFont_wght.ttf',
});

// スタイル定義
const BACKGROUND_COLOR = '#f3f4f5'
const BORDER_COLOR = '#b3b3b3'
const BORDER_STYLE = 'solid'
const COL1_WIDTH = 5
const COLN_WIDTH = (100 - COL1_WIDTH) / 2

const styles = StyleSheet.create({
  page: {
    fontFamily: 'NotoSansJP', // 日本語フォント
  },
  title: {
    fontSize: 14,
    marginBottom: 10,
    textAlign: "left",
    fontWeight: "bold",
  },
  table: {
    display: "table",
    width: "auto",
    borderStyle: BORDER_STYLE, 
    borderColor: BORDER_COLOR,
    borderWidth: 1,
    marginBottom: 10,
  }, 
  tableRow: {
    flexDirection: "row" 
  }, 
  tableCol1Header: { 
    width: COL1_WIDTH + '%',
    padding: 5,
    borderBottomWidth: 1,
    backgroundColor: BACKGROUND_COLOR,
    borderStyle: BORDER_STYLE, 
    borderColor: BORDER_COLOR,
  },     
  tableColHeader: { 
    width: COLN_WIDTH + "%",
    padding: 5,
    borderBottomWidth: 1,
    backgroundColor: BACKGROUND_COLOR,
    borderStyle: BORDER_STYLE, 
    borderColor: BORDER_COLOR,
  },   
  tableCol1: { 
    width: COL1_WIDTH + '%',
    padding: 5,
    borderBottomWidth: 1,
    borderStyle: BORDER_STYLE, 
    borderColor: BORDER_COLOR,
  },   
  tableCol: { 
    width: COLN_WIDTH + "%",
    padding: 5,
    borderBottomWidth: 1,
    borderStyle: BORDER_STYLE, 
    borderColor: BORDER_COLOR,
  }, 
  tableCellHeader: {
    fontSize: 12,
  },  
  tableCell: {
    fontSize: 10,
  },
  pageNumber: {
    fontSize: 8,
    textAlign: "center",
  },
  totalPages: {
    fontSize: 8,
    textAlign: "center",
  }
});

const UserListPdf = ({ users }) => (
  <Document>
    <Page size="A4" style={styles.page} wrap>
      <Text style={styles.title} fixed>
        ユーザ情報一覧
      </Text>
      <View style={styles.table}>
        <View style={styles.tableRow} fixed>
          <View style={styles.tableCol1Header}><Text style={styles.tableCellHeader}>ID</Text></View>
          <View style={styles.tableColHeader}><Text style={styles.tableCellHeader}>名前</Text></View>
          <View style={styles.tableColHeader}><Text style={styles.tableCellHeader}>住所</Text></View>
        </View>
        {users.map(user => (
          <View style={styles.tableRow} key={user.id} wrap={false}>
            <View style={styles.tableCol1}><Text style={styles.tableCell}>{user.id}</Text></View>
            <View style={styles.tableCol}><Text style={styles.tableCell}>{user.name}</Text></View>
            <View style={styles.tableCol}><Text style={styles.tableCell}>{user.address}</Text></View>
          </View>
        ))}
      </View>
      //フッターでページ数を表示
      <Text     
        style={styles.pageNumber}
        render={({ pageNumber, totalPages }) =>
          `${pageNumber} / ${totalPages}`
        }
        fixed
      />
    </Page>
  </Document>
);

export default UserListPdf;
