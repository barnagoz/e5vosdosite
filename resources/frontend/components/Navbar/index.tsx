import { ReactComponent as Donci } from 'assets/donci.svg'
import useUser from 'hooks/useUser'
import { useState } from 'react'
import QRCode from 'react-qr-code'
import { useLocation } from 'react-router-dom'

import { isTeacher } from 'lib/gates'
import Locale from 'lib/locale'

import Dialog from 'components/UIKit/Dialog'
import Navbar from 'components/UIKit/Navbar'

const locale = Locale({
    hu: {
        presentationSignup: 'Előadásjelentkezés',
        events: 'Események',
        title: 'Eötvös DÖ',
        login: 'Bejelentkezés',
        teams: 'Csapatok',
        logout: 'Kijelentkezés',
        info: 'DÖ Információk',
        noe5code: 'Nincs E5 kódod :(',
        presentations_teacher: 'Előadások - Tanári',
        dashboard: 'Kezdőlap',
        home: 'Kezdőlap',
        football: 'Mérkőzések',
    },
    en: {
        presentationSignup: 'Presentation signup',
        events: 'Events',
        title: 'Eötvös DÖ',
        login: 'Login',
        teams: 'Teams',
        logout: 'Logout',
        info: 'SU Information',
        noe5code: 'You have no E5 code :(',
        presentations_teacher: "Presentations - Teacher's Page",
        dashboard: 'Dashboard',
        home: 'Home',
        football: 'Matches',
    },
})

const CustomNavbar = () => {
    const { user } = useUser(false)
    const [showCode, setShowCode] = useState(false)
    const location = useLocation()
    return (
        <>
            {user && (
                <Dialog
                    title={`${user.name} (${user.ejg_class})`}
                    onClose={() => setShowCode(false)}
                    open={showCode}
                >
                    {user.e5code ? (
                        <QRCode
                            className="mb-2 mt-2 max-w-full"
                            value={user.e5code}
                        />
                    ) : (
                        <Donci className="fill-red mx-auto animate-pulse" />
                    )}
                    <span className=" bg-gray mt-2 w-full rounded-full px-3 py-1 text-center">
                        {user.e5code ?? locale.noe5code}
                    </span>
                </Dialog>
            )}
            <Navbar
                brand={
                    <Navbar.Brand onClick={() => setShowCode(true)}>
                        {user ? user.name : locale.title}
                    </Navbar.Brand>
                }
            >
                {/*
          <Navbar.Link href="https://info.e5vosdo.hu">{locale.info}</Navbar.Link>
          <Navbar.Link href="/csapat">{locale.teams}</Navbar.Link>
            */}
                {!user && <Navbar.Link href={`/`}>{locale.home}</Navbar.Link>}
                {user && (
                    <Navbar.Link href="/dashboard">
                        {locale.dashboard}
                    </Navbar.Link>
                )}
                <Navbar.Link href="/foci">{locale.football}</Navbar.Link>
                <Navbar.Link href="/esemeny">{locale.events}</Navbar.Link>
                {/*
                {isTeacher(user) && (
                    <Navbar.Link href="/eloadas/kezel">
                        {locale.presentations_teacher}
                    </Navbar.Link>
                )}
                <Navbar.Link href="/eloadas">
                    {locale.presentationSignup}
                </Navbar.Link>
                */}
                {!user && (
                    <Navbar.Link href={`/login?next=${location.pathname}`}>
                        {locale.login}
                    </Navbar.Link>
                )}
                {user && (
                    <Navbar.Link href="/logout">{locale.logout}</Navbar.Link>
                )}
            </Navbar>
        </>
    )
}
export default CustomNavbar
