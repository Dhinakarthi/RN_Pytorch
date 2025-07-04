import { Text, View } from "react-native";
import { DETECTOR_CRAFT_800, RECOGNIZER_EN_CRNN_128, RECOGNIZER_EN_CRNN_256, RECOGNIZER_EN_CRNN_512, useOCR } from "react-native-executorch";

const App = () => {
  const model = useOCR({
    detectorSource: DETECTOR_CRAFT_800,
    recognizerSources: {
      recognizerLarge: RECOGNIZER_EN_CRNN_512,
      recognizerMedium: RECOGNIZER_EN_CRNN_256,
      recognizerSmall: RECOGNIZER_EN_CRNN_128
    },
    language: "en",
  });

  if (!model.isReady)
    return (<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Model not ready</Text>
    </View>)

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>
        Hello Executorch !!!
      </Text>
    </View>
  )
}

export default App;