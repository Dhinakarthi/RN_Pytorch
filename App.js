import React, { useEffect, useState } from "react";
import { ActivityIndicator, Button, ScrollView, Text, View, Image } from "react-native";
import {
  DETECTOR_CRAFT_800,
  RECOGNIZER_EN_CRNN_128,
  RECOGNIZER_EN_CRNN_256,
  RECOGNIZER_EN_CRNN_512,
  useOCR
} from "react-native-executorch";
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

  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [imageUri, setImageUri] = useState(null);

  useEffect(() => {
    console.log("Model Status", model.isReady);
  }, [model.isReady]);

  const pickImageFromGallery = async () => {
    console.log("📷 pickImageFromGallery called");

    try {
      const result = await launchImageLibrary({ mediaType: "photo" });

      if (!result.assets || result.assets.length === 0) {
        console.warn("❌ No image selected");
        return;
      }

      const image = result.assets[0];
      setImageUri(image.uri);
      setLoading(true);
      setResults([]);

      const detections = await model.forward(image.uri);
      setResults(detections);
    } catch (error) {
      console.log("ERRRRR", error);
    } finally {
      setLoading(false);
    }
  };

  if (!model.isReady) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>🧠 Model is loading...</Text>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 16, justifyContent: 'center', alignItems: 'center' }}>
      <View style={{ alignItems: "center", marginBottom: 16 }}>
        <Button title="📷 Pick Image" onPress={pickImageFromGallery} />
      </View>

      {loading && (
        <View style={{ alignItems: "center", marginVertical: 16 }}>
          <ActivityIndicator size="large" color="#0000ff" />
          <Text>Processing image...</Text>
        </View>
      )}

      {imageUri && (
        <View style={{ alignItems: "center", marginBottom: 16 }}>
          <Image
            source={{ uri: imageUri }}
            style={{ width: 300, height: 300, resizeMode: "contain", borderRadius: 8 }}
          />
        </View>
      )}

      {results.length > 0 && (
        <View style={{ paddingHorizontal: 16 }}>
          <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 8 }}>Detected Labels:</Text>
          {results.map((item, index) => (
            <View key={index} style={{ marginBottom: 8, backgroundColor: "#f0f0f0", padding: 8, borderRadius: 6 }}>
              <Text style={{ fontSize: 16 }}>📝 Text: {item.text}</Text>
              {/* <Text style={{ fontSize: 14, color: "gray" }}>📦 BBox: {JSON.stringify(item.bbox)}</Text>
              <Text style={{ fontSize: 14, color: "gray" }}>📊 Score: {item.score.toFixed(2)}</Text> */}
            </View>
          ))}
        </View>
      )}
    </ScrollView>
  );
};

export default App;
