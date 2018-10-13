class Api::V1::BogglesController < ApplicationController

  # POST /boggles
  def create
    # get the board from json
    board = params[:boggle][:board]
    # get the search word from json
    word = params[:boggle][:word].upcase
    # populate board
    board_arr = Array.new
    board.each do |row|
      board_arr.push(row[:row])
    end

    board_model = BoardModel.new(board_arr);
    
    return_val = false

    # for all indexes, search the board
    board_model.indexes do |x, y|
        start = board_model.at_index(x, y)
        # only search if the current index is the first character of the search word
        if word.start_with?(start)
          return_val = search(word, x, y, start, board_model)
          # if we have found the word, break out
          break if return_val
        end
    end
      #respond
      render_response(return_val)
      
    end

    # Renders a response based on the status of the search
    # +status+:: result of the search
    def render_response(status)
      if status
        render json: {
          status: 200,
          message: "Word exists"
        }
      else
        head 404
      end
    end

    # Recursively search through all options from a given input
    # +word+:: Word to search for
    # +x+:: x index
    # +y+:: y index
    # +word_parts+:: current word being built from search
    # +board+:: +Board+ to search
    def search(word, x, y, word_parts, board)
      return_val = false
      # we found the word
      if word.eql? word_parts
        return_val = true
      # if word equals word_parts length, but isn't the same, this search is unsuccessful
      elsif word_parts.length == word.length
        return_val = false
        # else, keep searching
      elsif word.start_with? word_parts
        # gets neighbor elements
        board.get_neighbor(x, y) do |curr_x, curr_y|
            temp = word_parts.dup
            temp.concat(board.at_index(curr_x, curr_y))
            return_val = search(word, curr_x, curr_y, temp, board)
            # exit if true
            break if return_val
        end
      end
      
      return_val
    end 
  end
