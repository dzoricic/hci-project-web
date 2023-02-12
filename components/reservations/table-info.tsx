import { Grid, Text } from "@nextui-org/react";
import { Table } from "typings";
import styles from "styles/reservation.module.scss";

interface Props {
    table: Table;
    onClick?: (table: Table) => void;
}

const TableInfo = ({ table, onClick }: Props) => {
    const selectTable = () => {
        onClick && onClick(table);
    }

    return (
        <Grid.Container onClick={selectTable} className={styles.tableAreaContainer} justify="space-between" alignItems="center" css={{ backgroundColor: "$background_secondary", margin: "0 2px 2px 2px", padding: "0 2em" }}>
            <Text h4>{table.name}</Text>
            <Text>Price: {table.price} €</Text>
        </Grid.Container>
    )
}

export default TableInfo;