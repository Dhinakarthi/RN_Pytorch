import { useEffect } from "react";
import { Button, Text, View } from "react-native";
import { DETECTOR_CRAFT_800, RECOGNIZER_EN_CRNN_128, RECOGNIZER_EN_CRNN_256, RECOGNIZER_EN_CRNN_512, useOCR } from "react-native-executorch";
import { launchImageLibrary } from "react-native-image-picker";

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

  useEffect(() => {
    console.log('Model Status', model.isReady)
  }, [model.isReady])

  const pickImageFromGallery = async () => {
    
    try {
      for (const ocrDetection of await model.forward("https://ik.imagekit.io/r6ee6iubj/test.jpg?updatedAt=1751621241051")) {
        console.log("Bounding box: ", ocrDetection.bbox);
        console.log("Bounding label: ", ocrDetection.text);
        console.log("Bounding score: ", ocrDetection.score);
      }
    } catch (error) {
      console.log('ERRRRR', error)
    }

  };

  if (!model.isReady)
    return (<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Model not ready</Text>
    </View>)


  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {/* <Text>
        Hello Executorch !!!
      </Text> */}

      <Button
        title="Pick Image"
        onPress={pickImageFromGallery}
      />
    </View>
  )
}

export default App;