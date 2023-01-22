import { FooterItem, HeaderItem, HomeItem } from 'typings';

export const homeItems: HomeItem[] = [
    {
        title: 'Experience the best club nights on a while new level',
        text: 'We bring you only the best of what a night lifer can offer. Best DJs, magical lightshow and only the finest drniks. Make sure to place a reservation!',
        imageSource: '/photos/home_1.png',
        buttonText: 'All events',
        navigationLink: '/events'
    },
    {
        title: 'Enjoy the superb ambience and atmosphere',
        text: 'The Moon club is spread over 1000 m2 and it\'s in harmony with nature. The superbly decorated space and magical lightshow guarantee our guests and unforgettable nightlife experience.',
        imageSource: '/photos/home_2.png',
        buttonText: 'Our gallery',
        navigationLink: '/gallery'
    }
]

export const headerItems: HeaderItem[] = [
    {
        label: 'Home',
        url: '/home'
    },
    {
        label: 'Events',
        url: '/events'
    },
    {
        label: 'Gallery',
        url: '/gallery'
    },
    {
        label: 'Offers',
        url: '/offers'
    }
]

export const footerItems: FooterItem[] = [
    {
        imageSource: 'icons/map_pin.png',
        text: 'Broadway 13'
    },
    {
        imageSource: 'icons/mail.png',
        text: 'moon@fesb.hr'
    },
    {
        imageSource: 'icons/phone.png',
        text: '+385 91 123 4567'
    },
    {
        imageSource: 'icons/facebook.png',
        text: 'MoonBar @FaceBook'
    },
    {
        imageSource: 'icons/instagram.png',
        text: '@moon_instagram'
    },
    {
        imageSource: 'icons/twitter.png',
        text: '@MoonTwitter'
    },
]