import { Footer, Header } from "components";
import { userData } from "fake-data";

interface Props {
    children: JSX.Element;
}

const PageWrapper = ({children}: Props) => {
    return (
        <>
            <Header user={userData[0]}/>
                <main style={{flexGrow: 1}}>{children}</main>
            <Footer/>
        </>
    )
}

export default PageWrapper;