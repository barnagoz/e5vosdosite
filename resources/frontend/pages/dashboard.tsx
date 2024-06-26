import useUser from 'hooks/useUser'
import { useMemo } from 'react'

import eventAPI from 'lib/api/eventAPI'
import Locale from 'lib/locale'

import EventCard from 'components/EventCard'
import Loader from 'components/UIKit/Loader'

const locale = Locale({
    hu: {
        title: `Üdv,`,
        subtitle: `Üdvözlünk az ${
            import.meta.env.VITE_EVENT_HU
        } koordinálásáért felelős rendszerben. Itt többek közt élőben követheted a focimeccsek állását.`,
        login: 'Bejelentkezés',
        events: 'Események',
        eventsBySlot: 'Események időpont szerint',
        teams: 'Csapatok',
        suInformation: 'DÖ Információk',
        presentationSignup: 'Előadásjelentkezés',
    },
    en: {
        title: 'Hi,',
        subtitle: `Welcome to the system responsible for coordinating the ${
            import.meta.env.VITE_EVENT_EN
        }. Here you can follow the football matches.`,
        login: 'Login',
        events: 'Events',
        eventsBySlot: 'Events by slot',
        teams: 'Teams',
        suInformation: 'SU Information',
        presentationSignup: 'Presentation signup',
    },
})

const Dashboard = () => {
    const { user } = useUser()

    const { data: events, isFetching: isEventsFetching } =
        eventAPI.useGetEventsQuery()

    const currentNonFootballEvents = events?.filter(
        (event) =>
            new Date(event.starts_at) < new Date() &&
            new Date(event.ends_at) > new Date() &&
            event.slot.name !== 'Foci'
    )

    const currentFootballMatch = useMemo(() => {
        return events?.find(
            (event) =>
                new Date(event.starts_at) < new Date() &&
                new Date(event.ends_at) > new Date() &&
                event.slot.name === 'Foci'
        )
    }, [events])

    const footballScore = useMemo(() => {
        return currentFootballMatch?.description
            .split('/')[0]
            .split('-')
            .map(Number)
    }, [currentFootballMatch?.description])

    const footballGroup = useMemo(() => {
        switch (currentFootballMatch?.description.split('/')[1]) {
            case 'ACSOP':
                return 'A csoport'
            case 'BCSOP':
                return 'B csoport'
            case 'CCSOP':
                return 'C csoport'
            case 'DCSOP':
                return 'D csoport'
            case 'NEGYED':
                return 'Negyeddöntő'
            case 'ELODONT':
                return 'Elődöntő'
            case 'DONTO':
                return 'Döntő'
            case 'BRONZ':
                return 'Bronzmeccs'
            default:
                return ''
        }
    }, [currentFootballMatch?.description])

    if (!events) return <Loader />
    return (
        <div className="w-full">
            <div className="container mx-auto px-2">
                <div className="my-5 grid max-w-fit sm:grid-cols-1 md:mx-28 md:grid-cols-2 lg:grid-cols-3">
                    <div className="sm:col-span-1 md:col-span-2 lg:col-span-3">
                        <h1 className="mb-2 text-2xl font-bold">
                            {locale.title +
                                ' ' +
                                (user?.name ?? 'Felhasználó') +
                                '!'}
                        </h1>
                        <h3 className="text-lg">{locale.subtitle}</h3>
                    </div>
                    <div className="mb-2 mt-4 flex flex-wrap items-center justify-between rounded-lg bg-gray-600 px-4 py-2 sm:col-span-1 md:col-span-2 lg:col-span-3">
                        <div>
                            <h5 className="text-sm italic">{footballGroup}</h5>
                            <h4 className="text-lg font-semibold">
                                {currentFootballMatch
                                    ? currentFootballMatch.name
                                    : 'Jelenleg nincs meccs'}
                            </h4>
                        </div>
                        <div className="flex items-center justify-center gap-2 py-2">
                            <div className="rounded-lg bg-slate-100 px-6 py-2 text-xl font-semibold text-gray-700">
                                {footballScore ? footballScore[0] : '0'}
                            </div>
                            -
                            <div className="rounded-lg bg-slate-100 px-6 py-2 text-xl font-semibold text-gray-700">
                                {footballScore ? footballScore[1] : '0'}
                            </div>
                        </div>
                    </div>
                    <div className="pb-2 pt-3 sm:col-span-1 md:col-span-2 lg:col-span-3">
                        <h2 className="text-lg font-semibold">
                            Jelenlegi programok
                        </h2>
                    </div>
                    {isEventsFetching ? (
                        <Loader />
                    ) : (
                        <>
                            {currentNonFootballEvents?.map((event) => (
                                <EventCard event={event} key={event.id} />
                            ))}
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Dashboard
