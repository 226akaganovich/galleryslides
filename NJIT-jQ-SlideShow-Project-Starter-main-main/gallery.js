let mCurrentIndex = 0 // Tracks the current image index
let mImages = [] // Array to hold GalleryImage objects
const mUrl = 'images.json' // Replace with actual JSON URL
const mWaitTime = 5000 // Timer interval in milliseconds

$(document).ready(() => {
  $('.details').hide() // Hide details initially

  startTimer() // Call a function here to start the timer for the slideshow

  $('.moreIndicator').click(() => {
    $('.moreIndicator').toggleClass('rot90 rot270')
    $('.details').slideToggle()
  }) // Select the moreIndicator button and add a click event to:
  // - toggle the rotation classes (rot90 and rot270)
  // - slideToggle the visibility of the .details section

  $('#nextPhoto').click(showNextPhoto) // Select the "Next Photo" button and add a click event to call showNextPhoto

  $('#prevPhoto').click(showPrevPhoto) // Select the "Previous Photo" button and add a click event to call showPrevPhoto

  fetchJSON() // Call fetchJSON() to load the initial set of images
})

// Function to fetch JSON data and store it in mImages
function fetchJSON () {
  $.ajax({
    url: mUrl,
    type: 'GET',
    dataType: 'json',
    success: function(data) {
      mImages = data.images
      swapPhoto()
    },
    error: function() {
      console.log('Error loading JSON')
    }
  }) // Use $.ajax here to request the JSON data from mUrl
  // On success, parse the JSON and push each image object into mImages array
  // After JSON is loaded, call swapPhoto() to display the first image
}

// Function to swap and display the next photo in the slideshow
function swapPhoto () {
  if (mImages.length > 0) {
    $('#photo').attr('src', mImages[mCurrentIndex].imgPath)
    $('.location').text('Location: ' + mImages[mCurrentIndex].imgLocation)
    $('.description').text('Description: ' + mImages[mCurrentIndex].description)
    $('.date').text('Date: ' + mImages[mCurrentIndex].date)
  } // Access mImages[mCurrentIndex] to update the image source and details
  // Update the #photo element's src attribute with the current image's path
  // Update the .location, .description, and .date elements with the current image's details
}

// Advances to the next photo, loops to the first photo if the end of array is reached
function showNextPhoto () {
  mCurrentIndex = (mCurrentIndex + 1) % mImages.length
  swapPhoto() // Increment mCurrentIndex and call swapPhoto()
  // Ensure it loops back to the beginning if mCurrentIndex exceeds array length
}

// Goes to the previous photo, loops to the last photo if mCurrentIndex goes negative
function showPrevPhoto () {
  mCurrentIndex = (mCurrentIndex - 1 + mImages.length) % mImages.length
  swapPhoto() // Decrement mCurrentIndex and call swapPhoto()
  // Ensure it loops to the end if mCurrentIndex is less than 0
}

// Starter code for the timer function
function startTimer () {
  setInterval(showNextPhoto, mWaitTime) // Create a timer to automatically call `showNextPhoto()` every mWaitTime milliseconds
  // Consider using setInterval to achieve this functionality
  // Hint: Make sure only one timer runs at a time
}
