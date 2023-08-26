<template>
  <section class="banner">
    <div class="container">
      <picture>
        <source type="image/webp" srcset="/appstore.svg" />
        <img
          width="175"
          height="175"
          src="/appstore.svg"
          alt="App Store logo"
        />
      </picture>
      <div class="content">
        <span><b>Uwuifier</b> is now available for every Apple and Android device.</span>
        <div class="buttons">
          <a
            href="https://apps.apple.com/app/uwuifier/id1623454749"
            title="Go to the App Store Uwuifier app"
            >APP STORE DOWNLOAD</a
          >
          <a
            href="https://play.google.com/store/apps/details?id=com.sjorsvanholst.uwuifier"
            title="Go to the Google Play Uwuifier app"
            >PLAY STORE DOWNLOAD</a
          >
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.banner {
  display: flex;
  justify-content: center;

  .container {
    width: 900px;
    height: 350px;
    margin-top: calc(var(--header-height) * -1 + 20px) !important;
    justify-content: center;

    picture img {
      width: 175px;
      height: 175px;
      margin-top: 35px;
    }

    .content {
      margin: 30px 0 0 60px;

      .buttons {
        gap: 30px;
        display: flex;
      }
    }

    span {
      font-size: 2.8rem;
      font-weight: 300;
      margin-bottom: 20px;
    }

    a {
      color: #000;
      padding: 15px 20px;
      background: var(--app-normal-accent);
      transition: background 0.25s ease, box-shadow 0.25s ease;

      font-weight: 600;
      border-radius: 30px;

      &:hover {
        background: var(--app-hover-accent);
        box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1),
          0 1px 2px 0 rgba(0, 0, 0, 0.06);
      }
    }
  }
}

@media screen and (max-width: 900px) {
  .banner {
    padding: 100px 0px 80px 0px;

    .container {
      height: auto;
      margin: 0 30px;
      flex-direction: column;

      .content {
        margin: 0;
        margin-top: 30px;
      }

      span {
        text-align: center;
        margin-bottom: 30px;
      }

      .buttons {
        justify-content: center;
      }
    }
  }
}

@media screen and (max-width: 700px) {
  .banner picture img {
    width: 145px;
    height: 145px;
  }

  .buttons {
    flex-direction: column;
  }
}
</style>
