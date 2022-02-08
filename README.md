# three-components-vue

 🖼️ Draw Three.js scenes simple using Vue.js

## Install
```
npm i three-components-vue three
```

## Usage (npm)

JSX-like style

```jsx
render() {
  return (
    <div style={{ width: '500px', height: '300px' }}>
      <Renderer
        width={500} height={300}
        whenBeforeRender={() => {
          this.figureRotation.y += 0.01;
        }}
      >
        <PerspectiveCamera position={{ x: 2, y: 1.5, z: 1 }} />
        <Scene background={'#F0F0F0'}>
          <DirectionalLight position={{ x: 2, y: 3.5, z: 2 }} intensity={0.9} helper />
          <Mesh rotation={this.figureRotation}>
            <BoxGeometry />
            <StandartMaterial color={'darkviolet'} />
          </Mesh>
        </Scene>
      </Renderer>
    </div>
  )
);
```
