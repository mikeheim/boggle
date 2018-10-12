require 'test_helper'

class BogglesControllerTest < ActionDispatch::IntegrationTest
  setup do
    @boggle = boggles(:one)
  end

  test "should get index" do
    get boggles_url, as: :json
    assert_response :success
  end

  test "should create boggle" do
    assert_difference('Boggle.count') do
      post boggles_url, params: { boggle: { board: @boggle.board } }, as: :json
    end

    assert_response 201
  end

  test "should show boggle" do
    get boggle_url(@boggle), as: :json
    assert_response :success
  end

  test "should update boggle" do
    patch boggle_url(@boggle), params: { boggle: { board: @boggle.board } }, as: :json
    assert_response 200
  end

  test "should destroy boggle" do
    assert_difference('Boggle.count', -1) do
      delete boggle_url(@boggle), as: :json
    end

    assert_response 204
  end
end
