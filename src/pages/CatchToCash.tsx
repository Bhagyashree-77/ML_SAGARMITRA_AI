import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, UploadCloud } from "lucide-react";

interface Prediction {
  x: number;
  y: number;
  width: number;
  height: number;
  class: string;
  confidence: number;
}

export default function CatchToCash() {
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [results, setResults] = useState<Prediction[]>([]);
  const [loading, setLoading] = useState(false);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setImage(file);

    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  const handlePredict = async () => {
    if (!image) return;
    setLoading(true);

    const formData = new FormData();
    formData.append("file", image);

    try {
      const res = await axios.post<{ predictions: Prediction[] }>(
        "http://localhost:8000/predict",
        formData
      );
      setResults(res.data.predictions || []);
    } catch (err) {
      console.error("Prediction error:", err);
    }

    setLoading(false);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">

      {/* Title */}
      <motion.h1
        className="text-3xl font-bold text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        🐟 Catch To Cash — Fish Species Detection
      </motion.h1>

      {/* Upload Card */}
      <Card className="p-4 shadow-lg rounded-2xl">
        <CardHeader>
          <CardTitle className="text-lg">Upload Image</CardTitle>
        </CardHeader>

        <CardContent className="space-y-3">
          <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-400 rounded-xl cursor-pointer">
            <UploadCloud size={40} />
            <p>Click to upload fish image</p>
            <input type="file" accept="image/*" onChange={handleFile} className="hidden" />
          </label>

          {preview && (
            <motion.img
              src={preview}
              alt="preview"
              className="w-full rounded-xl mt-3 shadow"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            />
          )}

          <Button
            className="w-full"
            onClick={handlePredict}
            disabled={!image || loading}
          >
            {loading ? (
              <Loader2 className="animate-spin mr-2" />
            ) : null}
            {loading ? "Detecting..." : "Detect Species"}
          </Button>
        </CardContent>
      </Card>

      {/* Results */}
      {results.length > 0 && (
        <motion.div
          className="grid grid-cols-1 gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {results.map((item, idx) => (
            <Card key={idx} className="rounded-xl shadow">
              <CardContent className="p-4">
                <h3 className="font-bold text-xl">{item.class}</h3>
                <p className="text-gray-600">
                  Confidence: {(item.confidence * 100).toFixed(2)}%
                </p>
              </CardContent>
            </Card>
          ))}
        </motion.div>
      )}

      {!loading && results.length === 0 && (
        <p className="text-center text-gray-500">No species detected yet.</p>
      )}
    </div>
  );
}
