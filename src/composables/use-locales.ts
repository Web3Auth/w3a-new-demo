import { ref } from 'vue'

const locales: Record<string, Record<string, string>> = {
  en: {
    'header.title': 'Sign in',
    'header.subtitle': 'Your blockchain wallet with one click',
    'header.subtitle-name': 'Your {{appName}} wallet with one click',
    'social.continueCustom': 'Continue with {{adapter}}',
    'social.policy': 'We do not store any data related to your social logins.',
    'social.view-less': 'View less',
    'social.view-more': 'View more',
    'social.passwordless-cta': 'Continue',
    'social.passwordless-title': 'Email or Phone',
    'social.invalid-input': 'Invalid Email or Phone Number'
  },
  de: {
    'header.title': 'Einloggen',
    'header.subtitle': 'Ihre Blockchain-Brieftasche mit einem Klick',
    'header.subtitle-name': 'Ihre {{appName}}-Brieftasche mit einem Klick',
    'social.continueCustom': 'Fahren Sie mit {{adapter}} fort',
    'social.policy': 'Wir speichern keine Daten im Zusammenhang mit Ihren Social Logins.',
    'social.view-less': 'Weniger anzeigen',
    'social.view-more': 'Mehr anzeigen',
    'social.passwordless-cta': 'Weitermachen',
    'social.passwordless-title': 'E-Mail oder Telefon',
    'social.invalid-input': 'Ungültige E-Mail-Adresse oder Telefonnummer'
  },
  es: {
    'header.title': 'Iniciar sesión',
    'header.subtitle': 'Su billetera blockchain con un solo clic',
    'header.subtitle-name': 'Su billetera {{appName}} con un solo clic',
    'social.continueCustom': 'Continuar con {{adapter}}',
    'social.policy': 'No almacenamos ningún dato relacionado con sus inicios de sesión sociales.',
    'social.view-less': 'Ver menos',
    'social.view-more': 'Ver más',
    'social.passwordless-cta': 'Continuar',
    'social.passwordless-title': 'Email o teléfono',
    'social.invalid-input': 'Correo electrónico o número de teléfono no válido'
  },
  fr: {
    'header.title': 'Se connecter',
    'header.subtitle': 'Votre portefeuille blockchain en un clic',
    'header.subtitle-name': 'Votre portefeuille {{appName}} en un clic',
    'social.continueCustom': 'Continuer avec {{adapter}}',
    'social.policy': 'Nous ne stockons aucune donnée liée à vos connexions sociales.',
    'social.view-less': 'Voir moins',
    'social.view-more': 'Voir plus',
    'social.passwordless-cta': 'Continuer',
    'social.passwordless-title': 'Email ou téléphone',
    'social.invalid-input': 'E-mail ou numéro de téléphone invalide'
  },
  ja: {
    'header.title': 'ログイン',
    'header.subtitle': 'ワンクリックであなたのブロックチェーンウォレット',
    'header.subtitle-name': 'ワンクリックで {{appName}} ウォレット',
    'social.continueCustom': '{{adapter}}を続けます',
    'social.policy': 'ソーシャルログインに関連するデータは保存されません。',
    'social.view-less': '表示が少なくなります',
    'social.view-more': 'もっと見る',
    'social.passwordless-cta': '続ける',
    'social.passwordless-title': 'メールまたは電話',
    'social.invalid-input': '無効な電子メールまたは電話番号'
  },
  ko: {
    'header.title': '로그인',
    'header.subtitle': '한 번의 클릭으로 블록체인 지갑',
    'header.subtitle-name': '한 번의 클릭으로 {{appName}} 지갑',
    'social.continueCustom': '{{adapter}}을 계속하십시오',
    'social.policy': '우리는 귀하의 소셜 로그인과 관련된 데이터를 저장하지 않습니다.',
    'social.view-less': '덜보십시오',
    'social.view-more': '더보기',
    'social.passwordless-cta': '계속',
    'social.passwordless-title': '이메일 또는 전화',
    'social.invalid-input': '잘못된 이메일 또는 전화번호'
  },
  nl: {
    'header.title': 'Aanmelden',
    'header.subtitle': 'Uw blockchain-portemonnee met één klik',
    'header.subtitle-name': 'Uw {{appName}}-portemonnee met één klik',
    'social.continueCustom': 'Doorgaan met {{adapter}}',
    'social.policy': 'We slaan geen gegevens op die verband houden met uw sociale logins.',
    'social.view-less': 'Minder bekijken',
    'social.view-more': 'Meer bekijken',
    'social.passwordless-cta': 'Doorgaan',
    'social.passwordless-title': 'E-mail of telefoon',
    'social.invalid-input': 'Ongeldig e-mailadres of telefoonnummer'
  },
  pt: {
    'header.title': 'Entrar',
    'header.subtitle': 'Sua carteira de blockchain com um clique',
    'header.subtitle-name': 'Sua carteira {{appName}} com um clique',
    'social.continueCustom': 'Continue com o {{adapter}}',
    'social.policy': 'Não armazenamos nenhum dado relacionado ao seu login por rede social.',
    'social.view-less': 'Ver menos',
    'social.view-more': 'Ver mais',
    'social.passwordless-cta': 'Continuar',
    'social.passwordless-title': 'Email ou telefone',
    'social.invalid-input': 'E-mail ou número de telefone inválido'
  },
  tr: {
    'header.title': 'Giriş yap',
    'header.subtitle': 'Tek tıklama ile blockchain cüzdanınız',
    'header.subtitle-name': 'Tek tıklama ile {{appName}} cüzdanınız',
    'social.continueCustom': '{{adapter}} ile devam et',
    'social.policy': 'Sosyal medya girişlerinizle ilgili hiçbir veriyi saklamıyoruz.',
    'social.view-less': 'Daha az görüntüle',
    'social.view-more': 'Daha fazla görüntüle',
    'social.passwordless-cta': 'Devam et',
    'social.passwordless-title': 'E-posta veya Telefon',
    'social.invalid-input': 'Geçersiz E-posta veya Telefon Numarası'
  },
  zh: {
    'header.title': '登录',
    'header.subtitle': '一键点击您的区块链钱包',
    'header.subtitle-name': '一键点击您的 {{appName}} 钱包',
    'social.continueCustom': '继续使用{{adapter}}',
    'social.policy': '我们不存储与您的社交登录相关的任何数据。',
    'social.view-less': '少查看',
    'social.view-more': '查看更多',
    'social.passwordless-cta': '继续',
    'social.passwordless-title': '邮件或电话',
    'social.invalid-input': '电子邮件或电话号码无效'
  }
}
const activeLocale = ref('en')

export default () => {
  function setActiveLocale(locale: string) {
    activeLocale.value = locale
  }

  function t(key: string, template?: Record<string, string>) {
    if (!locales[activeLocale.value][key]) return key
    return locales[activeLocale.value][key].replaceAll(/{{(.*?)}}/g, (match) => {
      const localMatch = match.slice(2, -2)
      return template?.[localMatch] ?? ''
    })
  }

  return {
    activeLocale,
    setActiveLocale,
    t
  }
}
