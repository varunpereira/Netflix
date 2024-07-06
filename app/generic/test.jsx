import { createSignal, onMount } from "solid-js";

const VideoPlayer = () => {
  const [videoRef, setVideoRef] = createSignal(null);

  const openFullscreen = () => {
    const video = videoRef();
    if (video) {
      if (video.requestFullscreen) {
        video.requestFullscreen();
      } else if (video.webkitRequestFullscreen) {
        video.webkitRequestFullscreen();
      } else if (video.msRequestFullscreen) {
        video.msRequestFullscreen();
      }
    }
  };

  onMount(() => {
    const video = document.getElementById("myvideo");
    setVideoRef(video);
  });

  return (
    <div class='mt-20'>
      <h2>Fullscreen with JavaScript</h2>
      <p>Click on the button to open the video in fullscreen mode.</p>
      <button class='text-red-500' onClick={openFullscreen}>Open Video in Fullscreen Mode</button>
      <p>
        <strong>Tip:</strong> Press the "Esc" key to exit full screen.
      </p>

      <video width="100%" controls id="myvideo" ref={setVideoRef}>
        <source src="/shows/def.mp4" type="video/mp4" />
      </video>
    </div>
  );
};

export default VideoPlayer;

// export default () => {
// 	return <><h2>Fullscreen with JavaScript</h2>
// 	<p>Click on the button to open the video in fullscreen mode.</p>
// 	<button onclick="openFullscreen();">Open Video in Fullscreen Mode</button>
// 	<p><strong>Tip:</strong> Press the "Esc" key to exit full screen.</p>
	
// 	<video width="100%" controls id="myvideo">
// 		<source src="rain.mp4" type="video/mp4"/>
// 		<source src="rain.ogg" type="video/ogg"/>
// 		Your browser does not support the video tag.
// 	</video>

// 	<script>
// 	/* Get the element you want displayed in fullscreen */ 
// 	var elem = document.getElementById("myvideo");
	
// 	/* Function to open fullscreen mode */
// 	function openFullscreen() {
// 		if (elem.requestFullscreen) {
// 			elem.requestFullscreen();
// 		} else if (elem.webkitRequestFullscreen) { /* Safari */
// 			elem.webkitRequestFullscreen();
// 		} else if (elem.msRequestFullscreen) { /* IE11 */
// 			elem.msRequestFullscreen();
// 		}
// 	}
// 	</script>
	
// 	</>
// }