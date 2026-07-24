import { useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
import * as faceapi from "face-api.js";

function WebcamFeed({
    noFaceViolations,
    setNoFaceViolations,
    multipleFaceViolations,
    setMultipleFaceViolations,
}) {
    const webcamRef = useRef(null);
    const [status, setStatus] = useState("Loading +...");


    // Used to avoid counting the same violation repeatedly
    const [lastDetection, setLastDetection] = useState("face");

    useEffect(() => {
        loadModels();
    }, []);

    const loadModels = async () => {
        await faceapi.nets.tinyFaceDetector.loadFromUri("/models");
        await faceapi.nets.faceLandmark68TinyNet.loadFromUri("/models");

        setStatus("Models Loaded");

        detectFaces();
    };

    const detectFaces = () => {
        setInterval(async () => {

            if (!webcamRef.current || !webcamRef.current.video) return;

            const detections = await faceapi.detectAllFaces(
                webcamRef.current.video,
                new faceapi.TinyFaceDetectorOptions()
            );

            if (detections.length === 0) {

                setStatus(" No Face Detected");

                if (lastDetection !== "no-face") {
                    setNoFaceViolations(prev => prev + 1);
                    setLastDetection("no-face");
                }

            } else if (detections.length === 1) {

                setStatus(" Face Detected");

                if (lastDetection !== "face") {
                    setLastDetection("face");
                }

            } else {

                setStatus("⚠️ Multiple Faces Detected");

                if (lastDetection !== "multiple-face") {
                    setMultipleFaceViolations(prev => prev + 1);
                    setLastDetection("multiple-face");
                }

            }

        }, 1000);
    };

    return (
        <div>
            <Webcam
                ref={webcamRef}
                audio={true}
                mirrored={true}
                screenshotFormat="image/jpeg"
                videoConstraints={{
                    width: 400,
                    height: 300,
                    facingMode: "user",
                }}
                onUserMedia={() => {
                    console.log(" Webcam Started");
                }}
                onUserMediaError={(err) => {
                    console.log(" Webcam Error:", err);
                }}
                className="rounded-lg"
            />

            <p className="mt-4 font-semibold">
                {status}
            </p>

            <div className="mt-4 space-y-2">

                <p className="text-red-600 font-semibold">
                    No Face Violations : {noFaceViolations}
                </p>

                <p className="text-orange-600 font-semibold">
                    Multiple Face Violations : {multipleFaceViolations}
                </p>

            </div>


        </div>
    );
}

export default WebcamFeed;