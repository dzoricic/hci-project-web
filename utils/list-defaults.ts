import { FooterItem, HeaderItem, DefaultContainerItem, GalleryImage } from 'typings';

export const galleryList: GalleryImage[] = [
    {
        id: '1',
        imageSource: '/static/gallery/gallery1.png'
    },
    {
        id: '2',
        imageSource: '/static/gallery/gallery2.png'
    },
    {
        id: '3',
        imageSource: '/static/gallery/gallery3.png'
    },
    {
        id: '4',
        imageSource: '/static/gallery/gallery4.png'
    },
    {
        id: '5',
        imageSource: '/static/gallery/gallery5.png'
    },
    {
        id: '6',
        imageSource: '/static/gallery/gallery6.png'
    },
    {
        id: '7',
        imageSource: '/static/gallery/gallery7.png'
    },
    {
        id: '8',
        imageSource: '/static/gallery/gallery8.png'
    },
    {
        id: '9',
        imageSource: '/static/gallery/gallery9.png'
    },
    {
        id: '10',
        imageSource: '/static/gallery/gallery10.png'
    },
    {
        id: '11',
        imageSource: '/static/gallery/gallery11.png'
    },
    {
        id: '12',
        imageSource: '/static/gallery/gallery12.png'
    }
]

export const titlePictureData: DefaultContainerItem[] = [
    {
        title: 'Drinks offer',
        text: 'Only for you, we offer a wide range of drinks from every par of the world. Take a trip with us and enjoy!',
        imageSource: '/static/photos/drinks.png'
    },
    {
        title: 'Photo gallery',
        text: 'Moon Club is one of the most beautiful clubs in the open. Check out our photo gallery and see for yourself!',
        imageSource: '/static/photos/gallery.png'
    },
    {
        title: 'Events',
        text: 'We invite you to visit the world\'s greatest DJ names and everyday mainstream house programs, spiced with dance and stage performances',
        imageSource: '/static/photos/event.png'
    },
    {
        title: 'Moon club',
        text: 'Indoor & Outdoor floor, world top DJs, all-night parties. Join our clubbing familly!',
        imageSource: '/static/photos/home.png',
        navigationLink: '/events',
        buttonText: 'Make a reservation'
    }
]

export const homeItems: DefaultContainerItem[] = [
    {
        title: 'Experience the best club nights on a while new level',
        text: 'We bring you only the best of what a night lifer can offer. Best DJs, magical lightshow and only the finest drniks. Make sure to place a reservation!',
        imageSource: '/static/photos/home_1.png',
        buttonText: 'All events',
        navigationLink: '/events'
    },
    {
        title: 'Enjoy the superb ambience and atmosphere',
        text: 'The Moon club is spread over 1000 m2 and it\'s in harmony with nature. The superbly decorated space and magical lightshow guarantee our guests and unforgettable nightlife experience.',
        imageSource: '/static/photos/home_2.png',
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
        imageSource: '/static/icons/map_pin.png',
        text: 'Broadway 13'
    },
    {
        imageSource: '/static/icons/mail.png',
        text: 'moon@fesb.hr'
    },
    {
        imageSource: '/static/icons/phone.png',
        text: '+385 91 123 4567'
    },
    {
        imageSource: '/static/icons/facebook.png',
        text: 'MoonBar @FaceBook'
    },
    {
        imageSource: '/static/icons/instagram.png',
        text: '@moon_instagram'
    },
    {
        imageSource: '/static/icons/twitter.png',
        text: '@MoonTwitter'
    },
]