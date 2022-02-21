const cookieparser = process.server ? require('cookieparser') : undefined
export const state = () => {
  return {
    userInfo: null
  }
}

export const mutations = {
  setUserInfo(state, data) {
    state.userInfo = data;
  }
}

export const actions = {
  nuxtServerInit({ commit }, { req }) {
    let userInfo = null
    if (req.headers.cookie) {
      const parsed = cookieparser.parse(req.headers.cookie)
      try {
        userInfo = JSON.parse(parsed.userInfo)
      } catch (err) {
        //  console.log("json错了?")
        // No valid cookie found
      }
    }
    commit('setUserInfo', userInfo)
  }
}