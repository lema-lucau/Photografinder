import { Slider, RangeSlider } from '@mantine/core';

function App() {
  return (
    <div>
      <h1 class="text-xl font-bold underline text-purple-600">Tailwind and Mantine has been setup!</h1>
      <Slider
        marks={[
          { value: 20, label: '20%' },
          { value: 50, label: '50%' },
          { value: 80, label: '80%' },
        ]}
      />
    </div>
  );
}

export default App;
