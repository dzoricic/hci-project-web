import { Grid, Text } from "@nextui-org/react";
import { AreaLabels, PassLabels, TableArea } from "enums";
import { vector1, vector2, va, sa, bar } from "icons";
import { Area } from "typings";
import styles from "styles/reservation.module.scss";

const AreaImages = new Map([
    [TableArea.BAR, bar.src],
    [TableArea.STAGE, sa.src],
    [TableArea.VIP, va.src]
])

interface Props {
    area: Area;
    onClick?: (area: Area) => void;
}

const TableGroup = ({ area, onClick }: Props) => {
    const getAreaLabel = () => {
        return AreaLabels.get(area.type);
    }
    const getPassLabel = () => {
        return PassLabels.get(area.entrancePass);
    }
    const getAreaImage = () => {
        return AreaImages.get(area.type);
    }

    const getAreaData = () => {
        return (
            <Grid.Container direction="column">
                <Text css={{ fontSize: "0.8em", color: "gray" }}>Guests: {area.minimumGuests}</Text>
                <Text css={{ fontSize: "0.8em", color: "gray" }}>Arriving: {area.arrivalTime}</Text>
                <Text css={{ fontSize: "0.8em", color: "gray" }}>Entrance Pass: {getPassLabel()}</Text>
            </Grid.Container>
        )
    }

    const handleOnClick = () => {
        onClick && onClick(area);
    }
    
    return (
        <Grid.Container onClick={handleOnClick} className={styles.tableAreaContainer} direction="row" justify="space-between" css={{ margin: "2px", backgroundColor: "$background_secondary"}}>
            <Grid.Container xs={5} direction="column" css={{ padding: "1em" }}>
                <Text css={{ marginBottom: "1em" }}>{getAreaLabel()}</Text>
                {getAreaData()}
            </Grid.Container>
            <Grid.Container xs={5} direction="column" alignItems="center" css={{ padding: "1em" }}>
                <Text css={{ marginBottom: "1em" }}>Min {area.minimumPrice} €</Text>
                <img width="40" src={getAreaImage()}/>
            </Grid.Container>
            <Grid.Container xs={2} direction="row" justify="space-between" alignItems="center" css={{ paddingRight: "1em" }}>
                <img src={vector1.src} height="130px"/>
                <img src={vector2.src} height="35px"/>
            </Grid.Container>
        </Grid.Container>
    )
}

export default TableGroup;