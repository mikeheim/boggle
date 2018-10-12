class BoardModel
    # constructor
    # +board+:: array representing board
    def initialize(board)
        @board = board
        @length = board.length
    end

    # gets all neighbors of an index
    # +coord_x+:: x index
    # +coord_y+:: y index
    def get_neighbor(coord_x, coord_y)
        
        x_range = ([coord_x-1, 0].max)..([coord_x+1, @length-1].min)
        y_range = ([coord_y-1, 0].max)..([coord_y+1, @length-1].min)

        curr = @board[coord_x][coord_y]
        #mark current node so we don't return it
        for x in x_range
            for y in y_range
                yield x, y if @board[x][y]
            end
        end

        @board[coord_x][coord_y] = curr
    end

    # get letter at index
    # +x+:: x index
    # +y+:: y index
    def at_index(x,y)
        @board[x][y]
    end

    # iterate through board
    def indexes
        for x in 0...@length
          for y in 0...@length
            yield x, y
          end
        end
    end
end



    