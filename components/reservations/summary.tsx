import { Grid, Text } from "@nextui-org/react";
import { AreaLabels, PassLabels, TableArea } from "enums";
import { areaData } from "fake-data";
import { bar, va, sa, vector1, vector2, x } from "icons";
import { Area, Table } from "typings";
import styles from "styles/reservation.module.scss";

interface Props {
    table: Table;
    onClick?: () => void;
}

const AreaImages = new Map([
    [TableArea.BAR, bar.src],
    [TableArea.STAGE, sa.src],
    [TableArea.VIP, va.src]
])

const Summary = ({ table, onClick }: Props) => {
    const tablePrice = table.price;
    const bonus = 0;
    const additional = 0;

    const total = tablePrice + bonus + additional;

    const getTableArea = (selectedTable: Table): Area | undefined => {
        return areaData.find((areaItem) => areaItem.tables.find((table) => table.id === selectedTable.id))
    }

    const area = getTableArea(table); 

    const handleRemoveTable = () => {
        onClick && onClick();
    }

    const resolveSelectedTable = () => {
        return (
            <Grid.Container xs={6} direction="column" alignItems="center">
                <Text h3 css={{ marginBottom: "1em" }}>Selected Table</Text>
                <Grid.Container xs={7} direction="row" justify="space-between" alignItems="center">
                    {getAreaData()}
                    <Grid.Container xs={4} direction="row" alignItems="center">
                        <img width="70px" src={resolveImageSource()}/>
                        <img width="20px" src={x.src} onClick={handleRemoveTable} className={styles.tableAreaContainerButton} style={{ marginLeft: "1em" }}/>
                    </Grid.Container>
                </Grid.Container>
            </Grid.Container>
        )
    }

    const resolveImageSource = () => {
        if (area) {
            return AreaImages.get(area.type)
        }
    }

    const resolveDivider = () => {
        return (
            <Grid.Container xs={0.5} justify="space-between" alignItems="center">
                <img src={vector1.src} height = "160px"/>
                <img src={vector2.src} height = "35px"/>
            </Grid.Container>
        )
    }

    const resolveAreaLabel = () => {
        if (area) {
            return AreaLabels.get(area.type);
        }
    }

    const getPassLabel = () => {
        if (area) {
            return PassLabels.get(area.entrancePass)
        }
    }

    const getAreaData = () => {
        return (
            <Grid.Container xs={6} direction="column">
                <Text css={{ color: "gray" }}>{resolveAreaLabel()}</Text>
                <Text css={{ color: "gray" }}>Table: {table.name}</Text>
                <Text css={{ color: "gray" }}>Guests: {area?.minimumGuests}</Text>
                <Text css={{ color: "gray" }}>Arriving: {area?.arrivalTime}</Text>
                <Text css={{ color: "gray" }}>Entrance Pass: {getPassLabel()}</Text>
            </Grid.Container>
        )
    }

    const resolveTotal = () => {
        return (
            <Grid.Container xs={5.5} direction="column" alignItems="center">
                <Grid.Container xs={5} justify="space-between"><Text h4 css={{ fontWeight: 100 }}>Table:</Text><Text h4>{tablePrice} €</Text></Grid.Container>
                <Grid.Container xs={5} justify="space-between"><Text h4 css={{ fontWeight: 100 }}>Bonus:</Text><Text h4>{bonus} €</Text></Grid.Container>
                <Grid.Container xs={5} justify="space-between"><Text h4 css={{ fontWeight: 100 }}>Additional:</Text><Text h4>{additional} €</Text></Grid.Container>
                <Grid.Container xs={5} justify="space-between" css={{ marginTop: "1em" }}><Text h4 css={{ fontWeight: 100 }}>Total:</Text><Text h4>{total} €</Text></Grid.Container>
            </Grid.Container>
        )
    }

    return (
        <Grid.Container alignItems="center" css={{ backgroundColor: "$background_secondary", padding: "2em", marginBottom: "5em" }}>
            {resolveSelectedTable()}
            {resolveDivider()}
            {resolveTotal()}
        </Grid.Container>
    )
}

export default Summary;