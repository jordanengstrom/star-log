<template>
  <div class="hello">
    <div v-for="target in targets">
      <img :src="target.imgUrl">
      <h1 :class="{
        healthy: target.health >= 90,
        warning: target.health < 90 && target.health >= 50,
        'near-death': target.health < 50 && target.health > 0,
        dead: target.health <= 0
      }">{{ target.health ? target.health : target.name + ' is dead now' }}</h1>
      <div>
        <button v-for="(damage, attackType) in target.attackTypes" @click="attack(attackType, target)" :disabled="target.health < damage">
          {{attackType}}
        </button>
        <br>
        <button v-for="(damage, weaponType) in weaponTypes" @click="addWeapon(weaponType)" :disabled="target.health < damage">
          {{weaponType}}
        </button>
        <br>
        <button @click="reset(target)">reset</button>
      </div>
    </div>
  </div>
</template>

<!-- WE ARE MOVING AWAY FROM THIS IDEA: -->
<!-- function draw(arr){
  elem.innerHTML = `${message}`
} -->


<!-- THIS IS YOUR ENTIRE CONTROLLER -->
<script>
  export default {
    name: 'HelloWorld',
    data() {
      return {
        activeMod: 0,
        weaponTypes: {
          shuriken: 2,
          katana: 15,
          nunchaku: 8
        },
        targets: [{
          name: 'Po',
          imgs: {
            start: 'https://vignette.wikia.nocookie.net/kungfupanda/images/7/73/KFP3-promo-po4.jpg/revision/latest/scale-to-width-down/350?cb=20150726165358',
            hurt: 'https://i.ytimg.com/vi/c_jUb-Gz4uo/maxresdefault.jpg'
          },
          imgUrl: 'https://vignette.wikia.nocookie.net/kungfupanda/images/7/73/KFP3-promo-po4.jpg/revision/latest/scale-to-width-down/350?cb=20150726165358',
          health: 100,
          attackTypes: {
            slap: 1,
            punch: 5,
            kick: 10
          }
        }, {
          name: 'Shifu',
          imgs: {
            start: 'https://vignette.wikia.nocookie.net/kungfupanda/images/a/a6/KFP3-promo-shifu.jpg/revision/latest/scale-to-width-down/350?cb=20160223200109',
            hurt: 'https://img00.deviantart.net/6348/i/2015/049/c/e/master_shifu_by_fabylp-d8ijh0u.jpg',
          },
          imgUrl: 'https://vignette.wikia.nocookie.net/kungfupanda/images/a/a6/KFP3-promo-shifu.jpg/revision/latest/scale-to-width-down/350?cb=20160223200109',
          health: 150,
          attackTypes: {
            slap: 5,
            punch: 0,
            kick: 8
          }

        }]
      }
    },
    methods: {
      attack(attackType, target) {
        var damage = target.attackTypes[attackType];
        if (damage) {
          target.health -= damage * this.activeMod;
          if (target.health <= 50) {
            target.imgUrl = target.imgs.hurt;
          }
        }
        this.activeMod = 0
      },
      reset(target) {
        target.health = 100;
        target.imgUrl = target.imgs.start;
      },
      addWeapon(weaponType) {
        this.activeMod = this.weaponTypes[weaponType];
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .healthy {
    color: green;
  }

  .warning {
    color: orange;
  }

  .near-death {
    color: orangered;
  }

  .dead {
    color: grey;
  }

  img {
    height: 150px;
  }
</style>