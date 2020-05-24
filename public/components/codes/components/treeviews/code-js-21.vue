<template>
  <div>
    {{ code }}
  </div>
</template>

<script>
  export default {
    data() {
      return {
        code: '<script>\n' +
          '  const avatars = [\n' +
          '    \'?accessoriesType=Blank&avatarStyle=Circle&clotheColor=PastelGreen&clotheType=ShirtScoopNeck&eyeType=Wink&eyebrowType=UnibrowNatural&facialHairColor=Black&facialHairType=MoustacheMagnum&hairColor=Platinum&mouthType=Concerned&skinColor=Tanned&topType=Turban\',\n' +
          '    \'?accessoriesType=Sunglasses&avatarStyle=Circle&clotheColor=Gray02&clotheType=ShirtScoopNeck&eyeType=EyeRoll&eyebrowType=RaisedExcited&facialHairColor=Red&facialHairType=BeardMagestic&hairColor=Red&hatColor=White&mouthType=Twinkle&skinColor=DarkBrown&topType=LongHairBun\',\n' +
          '    \'?accessoriesType=Prescription02&avatarStyle=Circle&clotheColor=Black&clotheType=ShirtVNeck&eyeType=Surprised&eyebrowType=Angry&facialHairColor=Blonde&facialHairType=Blank&hairColor=Blonde&hatColor=PastelOrange&mouthType=Smile&skinColor=Black&topType=LongHairNotTooLong\',\n' +
          '    \'?accessoriesType=Round&avatarStyle=Circle&clotheColor=PastelOrange&clotheType=Overall&eyeType=Close&eyebrowType=AngryNatural&facialHairColor=Blonde&facialHairType=Blank&graphicType=Pizza&hairColor=Black&hatColor=PastelBlue&mouthType=Serious&skinColor=Light&topType=LongHairBigHair\',\n' +
          '    \'?accessoriesType=Kurt&avatarStyle=Circle&clotheColor=Gray01&clotheType=BlazerShirt&eyeType=Surprised&eyebrowType=Default&facialHairColor=Red&facialHairType=Blank&graphicType=Selena&hairColor=Red&hatColor=Blue02&mouthType=Twinkle&skinColor=Pale&topType=LongHairCurly\',\n' +
          '  ]\n' +
          '\n' +
          '  const pause = ms => new Promise(resolve => setTimeout(resolve, ms))\n' +
          '\n' +
          '  export default {\n' +
          '    data: () => ({\n' +
          '      active: [],\n' +
          '      avatar: null,\n' +
          '      open: [],\n' +
          '      users: [],\n' +
          '    }),\n' +
          '\n' +
          '    computed: {\n' +
          '      items () {\n' +
          '        return [\n' +
          '          {\n' +
          '            name: \'Users\',\n' +
          '            children: this.users,\n' +
          '          },\n' +
          '        ]\n' +
          '      },\n' +
          '      selected () {\n' +
          '        if (!this.active.length) return undefined\n' +
          '\n' +
          '        const id = this.active[0]\n' +
          '\n' +
          '        return this.users.find(user => user.id === id)\n' +
          '      },\n' +
          '    },\n' +
          '\n' +
          '    watch: {\n' +
          '      selected: \'randomAvatar\',\n' +
          '    },\n' +
          '\n' +
          '    methods: {\n' +
          '      async fetchUsers (item) {\n' +
          '        // Remove in 6 months and say\n' +
          '        // you\'ve made optimizations! :)\n' +
          '        await pause(1500)\n' +
          '\n' +
          '        return fetch(\'https://jsonplaceholder.typicode.com/users\')\n' +
          '          .then(res => res.json())\n' +
          '          .then(json => (item.children.push(...json)))\n' +
          '          .catch(err => console.warn(err))\n' +
          '      },\n' +
          '      randomAvatar () {\n' +
          '        this.avatar = avatars[Math.floor(Math.random() * avatars.length)]\n' +
          '      },\n' +
          '    },\n' +
          '  }\n' +
          '<\/script>'
      }
    }
  }
</script>
