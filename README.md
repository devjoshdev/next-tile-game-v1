# Tile Game

The Sliding Tile Game is a classic game typically played on a 4x4 board that involves a board like below

![Sliding Tile Board](https://en.wikipedia.org/wiki/Sliding_puzzle#/media/File:15-puzzle-02.jpg)

The object of the game is to use the one free space on the board to slide the tiles up, down, left, and right to arrange the tiles in a sorted order.


**Notes**
<hr/>
- If using the metadata object for setting the title of a page, then to get your favicon to display properly you have to add the favicon as 'icon.ico' in the /app directory and add it to the metadata object like so:

```javascript
export const metadata = {
  title: "Tile Game",
  icons: {
    icon: "/favicon.ico"
  }
}
```

