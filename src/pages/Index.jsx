import { useState, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { useGLTF, OrbitControls } from '@react-three/drei';
import { Button } from '@/components/ui/button';

const Model = ({ url }) => {
  const { scene } = useGLTF(url);
  return <primitive object={scene} />;
};

const Index = () => {
  const [modelUrl, setModelUrl] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setModelUrl(url);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <h1 className="text-4xl font-bold mb-8">3D Model Viewer</h1>
      <div className="w-full max-w-2xl aspect-square bg-white rounded-lg shadow-lg overflow-hidden mb-4">
        {modelUrl ? (
          <Canvas camera={{ position: [0, 0, 5] }}>
            <ambientLight intensity={0.5} />
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
            <Model url={modelUrl} />
            <OrbitControls />
          </Canvas>
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            Upload a .glb file to view the 3D model
          </div>
        )}
      </div>
      <input
        type="file"
        accept=".glb"
        onChange={handleFileUpload}
        className="hidden"
        ref={fileInputRef}
      />
      <Button onClick={() => fileInputRef.current.click()}>
        Upload .glb File
      </Button>
    </div>
  );
};

export default Index;
