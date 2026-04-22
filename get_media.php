<?php
$imageDir = "Image/";
$videoDir = "Video/";

$result = [];

// បន្ថែម Extension ទាំងអក្សរតូច និងអក្សរធំ ដើម្បីឱ្យប្រាកដថាទាញមកអស់
$imagePatterns = "*.{jpg,JPG,jpeg,JPEG,png,PNG,gif,GIF,jfif,JFIF,webp,WEBP}";
$images = glob($imageDir . $imagePatterns, GLOB_BRACE);

if ($images) {
    foreach ($images as $img) {
        $result[] = [
            "type" => "image",
            "src" => $img,
            "alt" => basename($img)
        ];
    }
}

// បន្ថែមសម្រាប់វីដេអូដូចគ្នា
$videoPatterns = "*.{mp4,MP4,webm,WEBM,mov,MOV}";
$videos = glob($videoDir . $videoPatterns, GLOB_BRACE);

if ($videos) {
    foreach ($videos as $vid) {
        $result[] = [
            "type" => "video",
            "src" => $vid,
            "alt" => basename($vid)
        ];
    }
}

header('Content-Type: application/json');
// បញ្ជូនទិន្នន័យទៅឱ្យ JavaScript
echo json_encode($result);
?>