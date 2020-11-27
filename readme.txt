Candy Crush Browser Version
-----------------------------------

App: CandyCrush

Components
- Board
- Box

Utils
- grid_helper - all grid functions
- local_storage - set and get data from local storage
- player - all sound related utility functions

Extra Features
1. Score 
   - Display removed blocks count and moves count
   - Show `Game Over!` and `Restart` when all the blocks are removed
2. Music
   - Background Music
   - Sound when blocks are removed
3. Preferences
   - Enable / Disable Music
   - Store the Music setting in the local storage
4. Responsiveness
   - Scale block size / fonts
   

Implementation Steps
------------------------------------
1. Grid with random blocks
2. Find adjacent blocks with same color on click
3. Added Click Music
4. Responsiveness
5. Remove adjacent blocks(from #2) with same color and move blocks down
6. Added Background Music
7. Added Enable/Disable Music through App props
8. Added Game Over 
9. Show Score and moves
10. Moved Enable/Disable Music as User Configuration (Refactor)
11. Added Tests
12. Enable/Disable Music through persistent storage
