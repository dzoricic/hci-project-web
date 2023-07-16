import { Area, Table } from "typings";
import styles from "./summary.module.scss";
import { areaData } from "fake-data";
import { useMemo } from "react";
import { PrimaryButton } from "components/button/primary-button";
import { vector2 } from "icons";
import { mapAreaToImage } from "./[eventId]";
import { useRouter } from "next/router";
import { useUserContext } from "common/user-context/use-user-context";
import Image from "next/image";

interface Props {
    table?: Table;
}

export const Summary = ({ table }: Props) => {
    const router = useRouter();
    const { user } = useUserContext();
    const area: Area | undefined = useMemo(() => findAreaByTable(table), [table]);

    if (!table) {
        return null;
    }

    if (!area) {
        return null;
    }

    const redirectToPayment = () => {
        router.push("/fake-checkout");
        // window.open("https://astounding-fudge-3b161b.netlify.app/", "_blank", "noreferrer");
    };

    return (
        <div className={styles.container}>
            <span className={styles.title}>Summary</span>
            <div className={styles.content}>
                <div className={styles.selectedTable}>
                    <span className={styles.tableDetailsTitle}>Selected table</span>
                    <div className={styles.tableDetails}>
                        <div className={styles.info}>
                            <span className={styles.infoText}>{area?.type} Area</span>
                            <span className={styles.infoText}>Guests: min {area?.minimumGuests}</span>
                            <span className={styles.infoText}>Arriving: {area?.arrivalTime} pm</span>
                            <span className={styles.infoText}>Enterance pass: {area?.entrancePass}</span>
                        </div>
                        <img className={styles.infoImage} src={mapAreaToImage(area.type)}/>
                    </div>
                </div>
                <div className={styles.divider}>
                    <Image alt="Arrow right" className={styles.arrowImage} src={vector2} width="60"/>
                </div>
                <div className={styles.paymentSummary}>
                    <div className={styles.row}>
                        <span className={styles.paymentTotal}>Balance</span>
                        <span className={styles.paymentTotal}>${user?.balance}</span>
                    </div>
                    <hr/>
                    <div className={styles.paymentDetails}>
                        <div className={styles.row}>
                            <span className={styles.paymentText}>Table</span>
                            <span className={styles.paymentTotal}>${table.price}.00</span>
                        </div>
                        <div className={styles.row}>
                            <span className={styles.paymentText}>Prepaid</span>
                            <span className={styles.paymentTotal}>$0.00</span>
                        </div>
                        <div className={styles.row}>
                            <span className={styles.paymentText}>Additional</span>
                            <span className={styles.paymentTotal}>$0.00</span>
                        </div>
                    </div>
                    <div className={styles.row}>
                        <span className={styles.paymentTotal}>Total</span>
                        <span className={styles.paymentTotal}>${table.price}.00</span>
                    </div>
                </div>
            </div>
            <div className={styles.buttonContainer}>
                <PrimaryButton text="Proceed to checkout" onClick={redirectToPayment}/>
            </div>
        </div>  
    )
}

export default Summary;

const findAreaByTable = (table?: Table): Area | undefined => {
    return areaData.find((area) => area.tables.find((t) => t.id === table?.id));
}
