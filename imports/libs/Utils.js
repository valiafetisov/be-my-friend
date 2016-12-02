import moment from 'moment'

const Utils = {

  formatData(timestamp) {
    return (timestamp)
      ? moment(timestamp).format('DD MMM HH:mm:ss')
      : ''
  }

}

export default Utils
