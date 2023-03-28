```sh



docker run -v /Library/WebServer/Documents/chatgpt/pngtogif/input:/images -w /images jrottenberg/ffmpeg -framerate 30 -pattern_type glob -i '*.png' -c:v libx264 -pix_fmt yuv420p -filter_complex "fade=in:st=0:d=1" output.mp4


docker run -v /Library/WebServer/Documents/chatgpt/pngtogif/input:/images -w /images jrottenberg/ffmpeg -framerate 1 -pattern_type glob -i '*.png' -c:v libx264 -pix_fmt yuv420p  -filter_complex "fade=in:0:30"   output.mp4


docker run -v /Library/WebServer/Documents/chatgpt/pngtogif/input:/images -w /images jrottenberg/ffmpeg -framerate 1 -pattern_type glob -i '*.png' -filter_complex "[0:v]select='not(mod(n,150))',fade=in:st=0:d=1,setpts=N/FRAME_RATE/TB[v];[0:a]anullsrc[a]" -map "[v]" -map "[a]" -c:v libx264 -pix_fmt yuv420p output.mp4


docker run -v /Library/WebServer/Documents/chatgpt/pngtogif/input:/images -w /images jrottenberg/ffmpeg -framerate 1 -pattern_type glob -i '*.png' -filter_complex "[0:v]select='not(mod(n,150))',setpts=N/FRAME_RATE/TB[v];[v]fade=in:st=0:d=1[v];[0:a]anullsrc[a]" -map "[v]" -map "[a]" -c:v libx264 -pix_fmt yuv420p output.mp4







docker run -v /Library/WebServer/Documents/chatgpt/pngtogif/input:/images -w /images jrottenberg/ffmpeg -framerate 1 -pattern_type glob -i '*.png' -filter_complex "[0:v]select='not(mod(n,150))',setpts=N/FRAME_RATE/TB[v];[v]fade=in:st=0:d=1[v];anullsrc,asetpts=N/SR/TB[a]" -map "[v]" -map "[a]" -c:v libx264 -pix_fmt yuv420p output.mp4




docker run -v /Library/WebServer/Documents/chatgpt/pngtogif/input:/images -w /images bitnami/ffmpeg:4.3.1-r0 -framerate 1 -pattern_type glob -i '*.png' -vf "select='not(mod(n,150))',fade=in:st=0:d=1,setpts=N/FRAME_RATE/TB" -c:v libx264 -pix_fmt yuv420p output.mp4


docker run -v /Library/WebServer/Documents/chatgpt/pngtogif/input:/images -w /images alpine-ffmpeg -framerate 1 -pattern_type glob -i '*.png' -vf "select='not(mod(n,150))',fade=in:st=0:d=1,setpts=N/FRAME_RATE/TB" -c:v libx264 -pix_fmt yuv420p output.mp4


```