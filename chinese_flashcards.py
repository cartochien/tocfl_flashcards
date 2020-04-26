import pandas as pd
import os.path
from os import path
import random

#Nico Challenge (after I get this all to work): 
# def highest_number(grid):
# grid = [[1, 0, 0, 0],
# 		[0, 1, 2, 0],
# 		[0, 1, 0, 0],
# 		[3, 0, 0, 0]]
#breadth first search
#depth first search
number_word_list = ['one', 'two', 'three', 'four', 'five']
number_digit_list = ['1', '2', '3', '4', '5']

# convert this if-else block into a switch statement

while True:
	tocfl_level = input("\nWhat TOCFL word list level do you want?\nType in 1, 2, 3, 4, or 5: ").lower()	
	if tocfl_level == 'one' or tocfl_level == '1':
		tocfl = pd.read_excel('tocfl_1.xlsx')
		break
	elif tocfl_level == 'two' or tocfl_level == '2':
		tocfl = pd.read_excel('tocfl_2.xlsx')
		break
	elif tocfl_level == 'three' or tocfl_level == '3':
		tocfl = pd.read_excel('tocfl_3.xlsx')
		break
	elif tocfl_level == 'four' or tocfl_level == '4':
		tocfl = pd.read_excel('tocfl_4.xlsx')
		break
	elif tocfl_level == 'five' or tocfl_level == '5':
		tocfl = pd.read_excel('tocfl_5.xlsx')
		break
	else:
		print("Sorry, only numbers 1-5 are accepted.")

for number_word, number_digit in zip(number_word_list, number_digit_list): 
	if (tocfl_level == number_word or tocfl_level == number_digit) and path.exists("tocfl_" + number_digit + "_review.xlsx") == True:
		while True:
			tocfl_review = input("\nDo you want to review the words you missed from your previous attempt?\nType in 'yes' or 'no': ")
			if tocfl_review == 'yes':
				tocfl = pd.read_excel('tocfl_' + number_digit + '_review.xlsx')
				break	
			elif tocfl_review == 'no':
				tocfl = pd.read_excel('tocfl_' + number_digit + '.xlsx')
				break
			else:
				print("Please type in 'yes' or 'no'.")

size = len(tocfl)
selection_indices = list(range(size))
random.shuffle(selection_indices)

def selection(index):
	
	term = tocfl.iloc[index]
	print(term)
	return term['Hanzi'], term['Pinyin'], term['PinyinNum'], term['PinyinNoTones'], term['Definition']

print("\nType in the pinyin for the corresponding word (tone marks are optional, e.g. 'nihao' and 'ni3hao3' are both acceptable.\nType in 'q' to quit.")

vocab_word = ""
vocab_correct = 0 
vocab_incorrect = 0
words_to_review = []
fulldefs_to_review = []
pinyins_to_review = []
pinyins_num_to_review = []
pinyins_no_tone_to_review = []
definitions_to_review = []

#Rule of thumb: Do not modify a dataset when you are looping through it
#Rule of thumb: If I can use a for loop, use a for loop (anytime you are using any iteration, use a for loop).
#Otherwise, use a while loop.

for index, random_value in enumerate(selection_indices):
	percent_correct = (vocab_correct/(index+1))*100
	hanzi, pinyin, pinyin_num, pinyin_no_tone, definition = selection(random_value)
	print(f"\nVocab Word #{index+1} (out of {size} total): {hanzi}")
	vocab_word = input()

	if vocab_word == pinyin_num or vocab_word == pinyin_no_tone:
		vocab_correct += 1
		print(f"\nNice! {pinyin} ({pinyin_num}) is correct!\nThe definition for {pinyin} ({pinyin_num}) is '{definition.strip()}'")
	elif vocab_word == 'q':
		vocab_incorrect += 1
		words_to_review.append(hanzi)
		fulldefs_to_review.append(pinyin + " " + definition)
		pinyins_to_review.append(pinyin)
		pinyins_num_to_review.append(pinyin_num)
		pinyins_no_tone_to_review.append(pinyin_no_tone)
		definitions_to_review.append(definition)
		break 
	else:
		vocab_incorrect += 1
		words_to_review.append(hanzi)
		fulldefs_to_review.append(pinyin + " " + definition)
		pinyins_to_review.append(pinyin)
		pinyins_num_to_review.append(pinyin_num)
		pinyins_no_tone_to_review.append(pinyin_no_tone)
		definitions_to_review.append(definition)
		print(f"Sorry, the correct pinyin is {pinyin} ({pinyin_num}).\nThe definition for {pinyin} ({pinyin_num}) is '{definition.strip()}'")

print(f"\nYou got {vocab_correct} words correct out of {index+1} words attempted! That's {percent_correct:.2f}%!")

if vocab_incorrect != 0:
	print(f"You need to study up on the following words:")

	for word_to_review, pinyin_to_review, definition_to_review in zip(words_to_review, pinyins_to_review, definitions_to_review):
		print(f"\t{word_to_review}({pinyin_to_review}): {definition_to_review}")

	items_to_review = list(zip(words_to_review, fulldefs_to_review, pinyins_to_review, pinyins_num_to_review, pinyins_no_tone_to_review, definitions_to_review))

	review_df = pd.DataFrame(items_to_review,
	                   columns=['Hanzi', 'FullDefinition', 'Pinyin', 'PinyinNum', 'PinyinNoTones', 'Definition'])

	for number_word, number_digit in zip(number_word_list, number_digit_list):
		if tocfl_level.lower() == number_word or tocfl_level == number_digit:
			review_df.to_excel("tocfl_" + number_digit + "_review.xlsx")

for number_digit in number_digit_list:
	if vocab_incorrect == 0 and path.exists("tocfl_" + number_digit + "_review.xlsx") == True:
		os.remove("tocfl_" + number_digit + "_review.xlsx")











