const baseUrl = window.location.origin

const redirectURI = `${baseUrl}/redirect`

export default {
    baseUrl,
    redirect_uri: redirectURI,
    // Torus Partners
    commonApiHost: 'http://localhost:2080',
    simplexApiHost: 'https://simplex-api.tor.us',
    moonpayApiHost: 'https://moonpay-api.tor.us',
    wyreApiHost: 'https://wyre-api.tor.us',
    rampApiHost: 'https://ramp-network-api.tor.us',
    xanpoolApiHost: 'https://xanpool-api.tor.us',
    mercuryoApiHost: 'https://mercuryo-api.tor.us',
    transakApiHost: 'https://transak-api.tor.us',
    banxaApiHost: 'https://banxa-api.tor.us',
    // External
    transakHost: 'https://global.transak.com',
    transakLiveAPIKEY: '5fd07d1e-d816-4f74-bfbe-538942830ad1',
    xanpoolHost: 'https://checkout.xanpool.com',
    xanpoolLiveAPIKEY: '778522fccc19a010f100f437c4aca60j',
    moonpayHost: 'https://buy.moonpay.io',
    moonpayLiveAPIKEY: 'pk_live_Wg90NLnFst3ms7tiqnMDDO0yjlypMzYK',
    mercuryoHost: 'https://exchange.mercuryo.io',
    mercuryoLiveAPIKEY: '8e531c49-2f64-4e7e-b1d4-16aa4958c291',

}