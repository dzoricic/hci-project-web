import { PageWrapper } from "components";
import { TableArea } from "enums";
import { floor_plan } from "icons";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Area, EventData, Table, User } from "typings";
import styles from "./event.module.scss";
import {va, sa, bar} from "../../icons";
import { areaData } from "fake-data";
import dropdownStyles from "../../components/header/dropdown.module.scss";
import { useUserContext } from "common/user-context/use-user-context";
import { Summary } from "./summary";
import { eventData } from "fake-data/event-data";
import { BackButton } from "components/button/back-button";
import { Loading } from "@nextui-org/react";

const Reservation = () => {
    const router = useRouter();
    const { eventId } = router.query;
    const { user } = useUserContext();
    const [selectedArea, setSelectedArea] = React.useState<Area>();
    const [selectedTable, setSelectedTable] = React.useState<Table>();
    const [sortByName, setSortByName] = useState<boolean>(true);
    const [sortAsc, setSortAsc] = useState<boolean>(true);
    const [openSort, setOpenSort] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);
    
    const event = eventData.find((event) => event.id == eventId)

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 2000);
    }, []);

    if (!event) {
        return loading ? <Loading/> : (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "100px", margin: "50px 0" }}>
                <BackButton text="Back to events" onClick={() => router.push("/events")}/>
                <span style={{ fontSize: "xx-large" }}>Could not find the event</span>
            </div>
        )
    }

    const renderSortByDropdown = (): JSX.Element => (
        <div
            className={dropdownStyles.dropdown}
        >
            <span className={styles.sortButton} onClick={() => setOpenSort(value => !value)}>{ sortByName ? "Name" : "Price" } { sortAsc ? <>&uarr;</> : <>&darr;</>}</span>
            {openSort && (
                <div className={dropdownStyles.dropdownMenuRight}>
                    <ul>
                        <li onClick={() => {
                            setSortByName(true);
                            setOpenSort(false)
                        }}>Name</li>
                        <li onClick={() => {
                            setSortByName(false);
                            setOpenSort(false)
                        }}>Price</li>
                        <hr/>
                        <li onClick={() => {
                            setSortAsc(value => !value);
                            setOpenSort(false)
                        }}>{ !sortAsc ? "Ascending" : "Descending" }</li>
                    </ul>
                </div>
            )}
        </div>
    );

    const renderHeader = () => (
        <div className={styles.header}>
            <span className={styles.reservationText}>Reservations</span>
            <div className={styles.balance}>
                <span className={styles.descriptionTitle}>Balance</span>
                <span>${user?.balance ?? "0"}.00</span>
            </div>
        </div>
    )

    const renderAreaContainer = (area?: Area): JSX.Element => {
        const displayArea = area ?? areaData.find(a => a.type === TableArea.STAGE)
        const image = mapAreaToImage(area?.type)
        if (!displayArea) {
            return renderLoading;
        }
        return (
            <div className={styles.description}>
                <div className={styles.infoContainer}>
                    <span className={styles.descriptionText}>Guests: min {displayArea.minimumGuests}</span>
                    <span className={styles.descriptionText}>Arrival time: {displayArea.arrivalTime} pm</span>
                    <span className={styles.descriptionText}>Enterance pass: {displayArea.entrancePass}</span>
                </div>
                <div className={styles.priceContainer}>
                    <span className={styles.descriptionTitle}>Min ${displayArea.minimumPrice}.00</span>
                    {image ? <img className={styles.areaLogo} src={image}/> : null}
                </div>
            </div>
        )
    }

    const renderAreaTabs = () => {
        return Object.values(TableArea).sort().map((area, index) => (
            <div
                key={index}
                className={styles.tab}
                style={((area === "All" && !selectedArea) || area === selectedArea?.type) ? { backgroundColor: "#282828" } : undefined}
                onClick={() => setSelectedArea(areaData.find(areaInfo => areaInfo.type === area))}
            >{area}</div>
        ))
    }

    const renderRows = (tables: Table[]) => {
        const array = [...tables];
        if (sortByName && sortAsc) {
            array.sort(sortByNameAsc);
        }
        if (sortByName && !sortAsc) {
            array.sort(sortByNameDesc);
        }
        if (!sortByName && sortAsc) {
            array.sort(sortByPriceAsc);
        }
        if (!sortByName && !sortAsc) {
            array.sort(sortByPriceDesc)
        }

        return array.map((table, index) => (
            <div key={index} className={styles.row} onClick={() => setSelectedTable(table)}>
                <span>{table.name}</span>
                <span>${table.price}.00</span>
            </div>
        ))
    }

    const handleRows = () => {
        if (!selectedArea) {
            let tables: Table[] = [];
            areaData.forEach((area) => {
                tables = [...tables, ...area.tables];
            })
            return renderRows(tables);
        }
        return renderRows(selectedArea.tables);
    }

    const renderTables = () => (
        <div className={styles.tablesContainer}>
            <div className={styles.table}>
                <span className={styles.tableTitle}>Table reservation</span>
                <div className={styles.tabs}>
                    {renderAreaTabs()}
                </div>
                {renderAreaContainer(selectedArea)}
                <div className={styles.sortHolder}>
                    <span className={styles.sortLabel}>Sort by:</span>
                    {renderSortByDropdown()}
                </div>
                <div className={styles.rowContainer}>
                    {handleRows()}
                </div>
            </div>
            <div className={styles.imageContainer}>
                <img src={floor_plan.src}/>
            </div>
        </div>
    )

    const renderEvent = () => {
        return (
            <div className={styles.eventContainer}>
                <BackButton text="Back to events" onClick={() => router.push("/events")}/>
                <div className={styles.eventInfo}>
                    <span className={styles.eventName}>{event.name}</span>
                    <img className={styles.eventImage} src={event.imageSource}/>
                </div>
            </div>
        )
    }

    return (
        <PageWrapper>
            <div className={styles.main}>
                <div className={styles.container}>
                    {renderEvent()}
                    {renderTables()}
                    <Summary table={selectedTable}/>
                </div>
            </div>
        </PageWrapper>
    )
}

export default Reservation;

const renderLoading = (
    <div>Loading</div>
)

export const mapAreaToImage = (tableArea?: TableArea): string | undefined => {
    switch (tableArea) {
        case TableArea.VIP:
            return va.src;
        case TableArea.BAR:
            return bar.src;
        case TableArea.STAGE:
            return sa.src;
        default:
            return;
    }
}

const sortByNameAsc = (prevTable: Table, currTable: Table) => {
    return currTable.name.localeCompare(prevTable.name);
}
const sortByNameDesc = (prevTable: Table, currTable: Table) => {
    return prevTable.name.localeCompare(currTable.name);
}
const sortByPriceAsc = (prevTable: Table, currTable: Table) => {
    return prevTable.price - currTable.price;
}
const sortByPriceDesc = (prevTable: Table, currTable: Table) => {
    return currTable.price - prevTable.price;
}
