const debug = require('debug')('app:plugin.avatar');

const isDebug = false;

const localAvatars = [
  '/static/img/avatar/user_1.png',
  '/static/img/avatar/user_2.png',
  '/static/img/avatar/user_3.png',
  '/static/img/avatar/user_4.png',
  '/static/img/avatar/user_5.png',
  '/static/img/avatar/user_6.png',
  '/static/img/avatar/user_7.png',
];

const vuetifyAvatars = [
  'https://cdn.vuetifyjs.com/images/lists/1.jpg',
  'https://cdn.vuetifyjs.com/images/lists/2.jpg',
  'https://cdn.vuetifyjs.com/images/lists/3.jpg',
  'https://cdn.vuetifyjs.com/images/lists/4.jpg',
  'https://cdn.vuetifyjs.com/images/lists/5.jpg'
];

const avataaars = [
  '?accessoriesType=Blank&avatarStyle=Circle&clotheColor=PastelGreen&clotheType=ShirtScoopNeck&eyeType=Wink&eyebrowType=UnibrowNatural&facialHairColor=Black&facialHairType=MoustacheMagnum&hairColor=Platinum&mouthType=Concerned&skinColor=Tanned&topType=Turban',
  '?accessoriesType=Sunglasses&avatarStyle=Circle&clotheColor=Gray02&clotheType=ShirtScoopNeck&eyeType=EyeRoll&eyebrowType=RaisedExcited&facialHairColor=Red&facialHairType=BeardMagestic&hairColor=Red&hatColor=White&mouthType=Twinkle&skinColor=DarkBrown&topType=LongHairBun',
  '?accessoriesType=Prescription02&avatarStyle=Circle&clotheColor=Black&clotheType=ShirtVNeck&eyeType=Surprised&eyebrowType=Angry&facialHairColor=Blonde&facialHairType=Blank&hairColor=Blonde&hatColor=PastelOrange&mouthType=Smile&skinColor=Black&topType=LongHairNotTooLong',
  '?accessoriesType=Round&avatarStyle=Circle&clotheColor=PastelOrange&clotheType=Overall&eyeType=Close&eyebrowType=AngryNatural&facialHairColor=Blonde&facialHairType=Blank&graphicType=Pizza&hairColor=Black&hatColor=PastelBlue&mouthType=Serious&skinColor=Light&topType=LongHairBigHair',
  '?accessoriesType=Kurt&avatarStyle=Circle&clotheColor=Gray01&clotheType=BlazerShirt&eyeType=Surprised&eyebrowType=Default&facialHairColor=Red&facialHairType=Blank&graphicType=Selena&hairColor=Red&hatColor=Blue02&mouthType=Twinkle&skinColor=Pale&topType=LongHairCurly'
];


class Avatar {
  constructor(email, params = {}) {
    this.params = {
      defaultType: 'mp', // '404'
      size: 80,
      defaultImage: '/static/img/avatar/user_default.png',
      isMultiImages: false,
      multiImages: 'vuetifyAvatars',// avataaars | vuetifyAvatars | localAvatars | pravatar
    };
    Object.assign(this.params, params);
    this.email = email;
  }

  /**
   * Image url
   * Get image URL for user
   * @param defaultType // 'mp'|'404'
   * @param size
   * @returns {string}
   */
  imageUrl(defaultType = 'mp', size = 80) {
    const crypto = require('crypto');
    defaultType = defaultType ? defaultType : this.params.defaultType;
    size = size ? size : this.params.size;
    const md5 = crypto.createHash('md5').update(this.email).digest('hex');
    const url = `https://secure.gravatar.com/avatar/${md5}?s=${size}&d=${defaultType}`;
    if (isDebug) debug('imageUrl:', url);
    return url;
  }

  /**
   * Is load image
   * @param url
   * @return {Promise}
   */
  loadImage(url = '') {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = function () {
        resolve(true);
        if (isDebug) debug('loadImage.onLoad:', true);
      };
      img.onerror = function () {
        reject(false);
        if (isDebug) debug('loadImage.onError:', true);
      };
      img.src = url ? url : this.href;
    });
  }

  /**
   * Get image
   * @return {Promise.<*>}
   */
  async getImage() {
    try {
      const url = this.imageUrl('404');
      await this.loadImage(url);
      return url;
    } catch (error) {
      return  this.params.isMultiImages? this.getRandomAvatar(): this.params.defaultImage;
    }
  }

  /**
   * Get random avatar
   * @return {string}
   */
  getRandomAvatar() {
    let avatar = '';
    switch(this.params.multiImages) {
    case 'localAvatars':
      avatar = localAvatars[Math.floor(Math.random() * localAvatars.length)];
      break;
    case 'vuetifyAvatars':
      avatar = vuetifyAvatars[Math.floor(Math.random() * vuetifyAvatars.length)];
      break;
    case 'avataaars':
      avatar = avataaars[Math.floor(Math.random() * avataaars.length)];
      avatar = `https://avataaars.io/${avatar}`;
      break;
    case 'pravatar':
      avatar = `http://i.pravatar.cc/${this.params.size}`;
      break;
    default:
      avatar = this.params.defaultImage;
    }
    return avatar;
  }
}

export default Avatar;
