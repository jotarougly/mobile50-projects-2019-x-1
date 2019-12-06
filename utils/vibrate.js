import {Vibration} from 'react-native'
const PATTERN = [1000, 2000, 3000];
export default () => Vibration.vibrate(PATTERN)
