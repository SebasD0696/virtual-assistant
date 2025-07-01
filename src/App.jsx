import HeygenFloatingAvatar from './components/HeygenFloatingAvatar.jsx';
import GoogleAuthButton from './components/GoogleAuthButton';

export default function App() {
  return (
    <main>
      <h1>Pagina de prueba</h1>
      {/* El avatar se inyecta flotante */}
      <GoogleAuthButton />
      <HeygenFloatingAvatar />
    </main>
  );
}
