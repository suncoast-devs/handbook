require 'minitest/spec'
require 'minitest/autorun'
require 'minitest/pride'
require_relative 'lib/de_enumerable'
require_relative 'lib/book'

require_relative 'your_code_here'

describe "Enumerable" do
  before(:all) do
    @war_and_peace = Book.new("War and Peace", 1869, "Leo Tolstoy", 1225)
    @h2g2          = Book.new("The Hitchhiker's Guide to the Galaxy", 1979, "Douglas Adams", 224)
    @moby_dick     = Book.new("Moby Dick", 1851, "Herman Melville", 927)
    @pride         = Book.new("Pride and Prejudice", 1813, "Jane Austen", 432)

    @books = [@war_and_peace, @h2g2, @moby_dick, @pride]
    de_enumerable(@books)

    @reimplements_enumerable = ReimplementEnumerable.new(@books)
  end

  it "implements select correctly" do
    short_books = [@h2g2, @pride]

    assert_equal short_books, @reimplements_enumerable.select { |book| book.page_count < 500 }
  end

  it "implements all? correctly when results are true" do
    skip
    results = @reimplements_enumerable.all? { |book| book.year > 1800 }

    assert_equal true, results
  end

  it "implements all? correctly when the results are false" do
    skip
    results = @reimplements_enumerable.all? { |book| book.year == 1800 }

    assert_equal false, results
  end

  it "implements count correctly" do
    skip
    results = @reimplements_enumerable.count { |book| book.page_count > 300 }

    assert_equal 3, results
  end

  it "implements count correctly" do
    skip
    results = @reimplements_enumerable.count { |book| book.page_count == 1225 }

    assert_equal 1, results
  end

  it "implements count correctly" do
    skip
    results = @reimplements_enumerable.count { |book| book.page_count > 3000 }

    assert_equal 0, results
  end

  it "implements find correctly when there is a match" do
    skip
    results = @reimplements_enumerable.find { |book| book.year > 1970 }

    assert_equal @h2g2, results
  end

  it "implements find correctly when there is not a match" do
    skip
    results = @reimplements_enumerable.find { |book| book.year < 1492 }

    assert_nil results
  end

  it "implements each_with_index correctly" do
    skip
    object_results = []
    index_results = []

    @reimplements_enumerable.each_with_index do |book, index|
      object_results << book
      index_results  << index
    end

    assert_equal [@war_and_peace, @h2g2, @moby_dick, @pride], object_results
    assert_equal [0, 1, 2, 3], index_results
  end

  it "implements drop correctly" do
    skip
    assert_equal [@moby_dick, @pride], @reimplements_enumerable.drop(2)
  end

  it "implements drop_while correctly" do
    skip
    results = @reimplements_enumerable.drop_while { |book| book.year < 1900 }

    assert_equal [@h2g2, @moby_dick, @pride], results
  end

  it "implements find index correctly when there is a match" do
    skip
    results = @reimplements_enumerable.find_index { |book| book.year == 1851 }

    assert_equal 2, results
  end

  it "implements find index correctly when there is no match" do
    skip
    results = @reimplements_enumerable.find_index { |book| book.year == 2017 }

    assert_nil @reimplements_enumerable.find { |book| book.year == 2017 }
  end

  it "implements include? correctly when there is a match" do
    skip
    results = @reimplements_enumerable.include?(@h2g2)

    assert_equal true, results
  end

  it "implements include? correctly when there is no match" do
    skip
    not_in_list = Book.new("A Brief History of Time", 1988, "Stephen Hawking", 256)

    results = @reimplements_enumerable.include?(@not_in_list)

    assert_equal false, results
  end

  it "implements map correctly" do
    skip
    results = [1869, 1979, 1851, 1813]

    assert_equal results, @reimplements_enumerable.map { |book| book.year }
  end

  it "implements max_by correctly" do
    skip
    results = @h2g2

    assert_equal results, @reimplements_enumerable.max_by { |book| book.year }
  end

  it "implements max_by correctly" do
    skip
    results = @war_and_peace

    assert_equal results, @reimplements_enumerable.max_by { |book| book.title }
  end

  it "implements min_by correctly" do
    skip
    results = @pride

    assert_equal results, @reimplements_enumerable.min_by { |book| book.year }
  end

  it "implements min_by correctly" do
    skip
    results = @moby_dick

    assert_equal results, @reimplements_enumerable.min_by { |book| book.title }
  end

  it "implements none? correctly when there is no match" do
    skip
    assert_equal true, @reimplements_enumerable.none? { |book| book.year == 1492 }
  end

  it "implements none? correctly when there is a match" do
    skip
    assert_equal false, @reimplements_enumerable.none? { |book| book.year == 1869 }
  end

  it "implements one? correctly when there is one match" do
    skip
    assert_equal true, @reimplements_enumerable.one? { |book| book.year < 1850 }
  end

  it "implements one? correctly when there is more than one match" do
    skip
    assert_equal false, @reimplements_enumerable.one? { |book| book.year > 1851 }
  end

  it "implements partition correctly" do
    skip
    short_books = [@h2g2, @pride]
    long_books  = [@war_and_peace, @moby_dick]

    assert_equal [short_books, long_books], @reimplements_enumerable.partition { |book| book.page_count < 500 }
  end

  it "implements reject correctly" do
    skip
    short_books = [@h2g2, @pride]

    assert_equal short_books, @reimplements_enumerable.reject { |book| book.page_count > 500 }
  end

  it "implements select correctly" do
    skip
    short_books = [@h2g2, @pride]

    assert_equal short_books, @reimplements_enumerable.select { |book| book.page_count < 500 }
  end

  it "implements reverse_each correctly" do
    skip
    expected = [@pride, @moby_dick, @h2g2, @war_and_peace]

    results = []
    @reimplements_enumerable.reverse_each do |element|
      results << element
    end

    assert_equal expected, results
  end
end
