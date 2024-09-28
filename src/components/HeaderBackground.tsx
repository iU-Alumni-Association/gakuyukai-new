import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { Delaunay } from 'd3-delaunay';

interface HeaderBackgroundProps {
  colors?: string[]; // Array of color codes to use for the triangles.
  numPoints?: number; // Number of random points to generate for the Delaunay triangulation.
}

/**
 * HeaderBackground component renders a dynamic background using Three.js and Delaunay triangulation.
 * A transparent black overlay is added over the entire background.
 *
 * @param {string[]} [colors=['#0044ff', '#0066ff', '#0088ff', '#00aaff', '#00ccff']] - Array of color codes.
 * @param {number} [numPoints=100] - Number of points for triangulation.
 * @returns {JSX.Element} - The rendered component.
 */
const HeaderBackground: React.FC<HeaderBackgroundProps> = ({
  colors = ['#0044ff', '#0066ff', '#0088ff', '#00aaff', '#00ccff'],
  numPoints = 100,
}) => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // Initialize the Three.js scene.
    const scene = new THREE.Scene();

    // Set up the camera with perspective projection.
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 2000);
    camera.position.z = 400; // Position the camera along the z-axis.

    // Initialize the renderer and attach it to the DOM.
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight); // Set renderer size.
    renderer.setPixelRatio(window.devicePixelRatio); // Set pixel ratio for retina displays.

    mountRef.current.appendChild(renderer.domElement); // Append renderer to the mount element.

    /**
     * Handle window resize events.
     * Updates camera aspect ratio and renderer size.
     */
    const onWindowResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix(); // Update the camera projection matrix.

      renderer.setSize(window.innerWidth, window.innerHeight); // Update renderer size.
    };
    window.addEventListener('resize', onWindowResize);

    // Generate random points for Delaunay triangulation.
    const points: Array<[number, number]> = [];
    for (let i = 0; i < numPoints; i++) {
      points.push([Math.random() * window.innerWidth, Math.random() * window.innerHeight]);
    }

    // Perform Delaunay triangulation on the generated points.
    const delaunay = Delaunay.from(points);
    const triangles = delaunay.triangles;

    // Create buffer geometry for the triangles.
    const geometry = new THREE.BufferGeometry();
    const vertices: number[] = [];
    const colorsArray: number[] = [];

    // Construct vertices and color attributes for each triangle.
    for (let i = 0; i < triangles.length; i += 3) {
      const index1 = triangles[i];
      const index2 = triangles[i + 1];
      const index3 = triangles[i + 2];

      const vertex1 = points[index1];
      const vertex2 = points[index2];
      const vertex3 = points[index3];

      // Adjust vertices to center the geometry.
      vertices.push(vertex1[0] - window.innerWidth / 2, -vertex1[1] + window.innerHeight / 2, 0);
      vertices.push(vertex2[0] - window.innerWidth / 2, -vertex2[1] + window.innerHeight / 2, 0);
      vertices.push(vertex3[0] - window.innerWidth / 2, -vertex3[1] + window.innerHeight / 2, 0);

      // Assign a random color from the provided colors array.
      const colorCode = colors[Math.floor(Math.random() * colors.length)];
      const color = new THREE.Color(colorCode);

      // Add color information for each vertex of the triangle.
      colorsArray.push(color.r, color.g, color.b);
      colorsArray.push(color.r, color.g, color.b);
      colorsArray.push(color.r, color.g, color.b);
    }

    // Set position and color attributes for the geometry.
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
    geometry.setAttribute('color', new THREE.Float32BufferAttribute(colorsArray, 3));

    // Define the material with vertex colors and transparency.
    const material = new THREE.MeshBasicMaterial({
      vertexColors: true,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.8,
    });

    // Create a mesh from the geometry and material, then add it to the scene.
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    /**
     * Handle scroll events to rotate the mesh based on scroll position.
     */
    const onScroll = () => {
      const scrollY = window.scrollY;
      mesh.rotation.x = scrollY * 0.001; // Rotate the mesh slightly on the x-axis.
    };
    window.addEventListener('scroll', onScroll);

    onScroll(); // Initialize rotation based on current scroll position.

    /**
     * Animation loop to render the scene.
     */
    const animate = () => {
      requestAnimationFrame(animate);

      renderer.render(scene, camera); // Render the scene using the camera.
    };
    animate(); // Start the animation loop.

    // Cleanup function to remove event listeners and dispose resources.
    return () => {
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement); // Remove renderer from the DOM.
      }
      window.removeEventListener('resize', onWindowResize);
      window.removeEventListener('scroll', onScroll);

      geometry.dispose(); // Dispose of geometry to free up memory.
      material.dispose(); // Dispose of material.
      renderer.dispose(); // Dispose of renderer.
    };
  }, [colors, numPoints]); // Re-run effect if colors or numPoints change.

  return (
    <div className="relative">
      <div ref={mountRef} className="absolute inset-0 z-0" />
      {/* Transparent black overlay */}
      <div className="absolute inset-0 z-10 bg-sk opacity-50" />
    </div>
  );
};

export default HeaderBackground;
