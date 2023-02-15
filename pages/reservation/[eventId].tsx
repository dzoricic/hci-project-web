import { Button, Grid, Text } from "@nextui-org/react";
import { PageWrapper } from "components";
import TableGroup from "components/reservations/table-group";
import TableInfo from "components/reservations/table-info";
import { AreaLabels } from "enums";
import { areaData, userData } from "fake-data";
import { tableData } from "fake-data/table-data";
import { floor_plan } from "icons";
import { useRouter } from "next/router";
import React from "react";
import { Area, EventData, Table, User } from "typings";
import styles from "styles/home-page.module.scss";
import Summary from "components/reservations/summary";
import { eventData } from "fake-data/event-data";
import { useSnackbar } from "react-simple-snackbar";

const Reservation = () => {
    const router = useRouter();
    const [openErrorSnackbar] = useSnackbar({
        style: {
            backgroundColor: "red"
        }
    });
    const [user, setUser] = React.useState<User>();
    const [event, setEvent] = React.useState<EventData>();
    const [selectedArea, setSelectedArea] = React.useState<Area>();
    const [selectedTable, setSelectedTable] = React.useState<Table>();

    React.useEffect(onMount, []);
    React.useEffect(onMount, [router]);

    function onMount() {
        const { eventId } = router.query;
        const loggedInUserId = localStorage.getItem('user_id');
        if (!loggedInUserId) {
            openErrorSnackbar("Cannot access this page without login!");
            router.push('/login');
            return;
        }
        setEvent(findEvent(eventId as string));
        setUser(findUser(localStorage.getItem('user_id')));
    }

    const findUser = (id: string | null) => {
        return userData.find(( userItem ) => userItem.id === id);
    }

    const findEvent = (id: string | null) => {
        return eventData.find(( eventItem ) => eventItem.id === id);
    }

    const resolveHeader = () => {
        return (
            <Grid.Container id="header">
                <Grid.Container direction="row" justify="space-between" alignItems="center" css={{ padding: "1em 7em 1em 2em" }}>
                    <Grid.Container xs={6} alignItems="center">
                        <img src={event?.imageSource} width="100px" style={{ marginRight: "2em" }}/>
                        <Text h3>{event?.name}</Text>
                    </Grid.Container>
                    <Grid xs={6} justify="flex-end">
                        <Text h4 css={{ marginRight: "2em", fontWeight: 100 }}>Balance:</Text>
                        <Text h4>{user?.balance} €</Text>
                    </Grid>
                </Grid.Container>
            </Grid.Container>
        )
    }

    const resolveFloorMap = () => {
        return (
            <Grid.Container xs={12} sm={6}>
                <img src={floor_plan.src}/>
            </Grid.Container>
        )
    }

    const getAreaName = () => {
        if (!selectedArea) {
            return "All Tables";
        }
        return AreaLabels.get(selectedArea.type);
    }
    
    const getAllTables = () => {
        return tableData.sort((a, b) => a.price > b.price ? 1 : -1).map((table) => <TableInfo table={table} onClick={handleTableClick}/>)
    }

    const getAreaTables = (area: Area) => {
        return area.tables.sort((a, b) => a.price > b.price ? 1 : -1).map((table) => <TableInfo table={table} onClick={handleTableClick}/> )
    }

    const renderAllTablesButton = () => {
        return <Button auto disabled={!selectedArea} onClick={ () => handleTableAreaClick()} className={ styles.homeContainerButton } css={{color: 'Black', backgroundColor: '$secondary'}}>All Tables</Button>
    }

    const resolveTableList = () => {
        return (
            <Grid.Container xs={12} sm={3} direction="column" justify="flex-start" css={{ padding: "2px 1em"}}>
                <Grid.Container justify="space-between" alignItems="center" css={{ backgroundColor: "$background_secondary", marginBottom: "1em", padding: "0 1em" }}>
                    <Text h4 css={{ margin: "1em 0" }}>{getAreaName()}</Text>
                    {renderAllTablesButton()}
                </Grid.Container>
                <Grid.Container css={{ overflowY: "auto", overflowX: "hidden", aspectRatio: 0.67 }}>
                    <Grid.Container direction="column" alignItems="center">
                        {selectedArea ? getAreaTables(selectedArea) : getAllTables()}
                    </Grid.Container>
                </Grid.Container>
            </Grid.Container>
        )
    }

    const handleTableAreaClick = (area?: Area) => {
        setSelectedArea(area);
    }

    const handleTableClick = (table?: Table) => {
        setSelectedTable(table);
        if (!table) {
            const header = document.getElementById('header');
            if (header) {
                header.scrollIntoView({ behavior: 'smooth' });
            }
        } else {
            const summary = document.getElementById('summary');
            if (summary) {
                summary.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }
    }

    const getTableAreas = () => {
        return areaData.map((area) => <TableGroup area={area} onClick={handleTableAreaClick}/>)
    }

    const resolveTablePicker = () => {
        return (
            <Grid.Container xs={12} sm={3} direction="column" alignItems="center">
                {getTableAreas()}
            </Grid.Container>
        )
    }

    const renderDividerText = () => {
        return (
            <Grid.Container id="summary" justify="center" alignItems="center" css={{ padding: "5em" }}>
                <Text h1 css={{ fontWeight: '100' }}>Summary</Text>
            </Grid.Container>
        )
    }

    const noSummaryText = () => {
        return (
            <Grid.Container justify="center" css={{ paddingBottom: "5em" }}>
                <Text h3 css={{ fontWeight: 100 }}>No tables selected</Text>
            </Grid.Container>
        )
    }

    if (!user) {
        return <Grid.Container justify="center">Could not find user</Grid.Container>
    }

    const resolveSummary = () => {
        if (!selectedTable) {
            return noSummaryText();
        }
        return (
            <Grid.Container direction="column" alignItems="center" css={{ marginBottom: "5em" }}>
                <Summary table={selectedTable} onClick={() => handleTableClick(undefined)}/>
                <Button auto size="xl" onClick={() => router.push("/fake-checkout")}>Proceed to checkout</Button>
            </Grid.Container>
        )
    }

    return (
        <PageWrapper>
            <main>
                <Grid.Container direction="row">
                    {resolveHeader()}
                    {resolveTablePicker()}
                    {resolveTableList()}
                    {resolveFloorMap()}
                </Grid.Container>
                {renderDividerText()}
                {resolveSummary()}
            </main>
        </PageWrapper>
    )
}

export default Reservation;