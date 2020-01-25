import praw
import pandas as pd
import datetime as dt

reddit = praw.Reddit(client_id='yQYY-pqxLmWtyQ', \
                     client_secret='hHuoibshAN87odn5TigY-90d41Y', \
                     user_agent='CommentScraper', \
                     username='SpartanNitro1', \
                     password='Destinies6!')

subreddit = reddit.subreddit('roastme')


insult_library = []

def get_best_comment(submission, comment_library):
    max = 0
    for top_level_comment in submission.comments:
        if top_level_comment.score > max:
            max = top_level_comment.score
            max_comment = top_level_comment

    comment_library.append({"insult": max_comment.body, "url": submission.url })

for submission in subreddit.hot(limit=10):
    submission.comments.replace_more(limit=0)
    get_best_comment(submission, insult_library)

get_best_comment(submission, insult_library)
for insult in insult_library:
    print(insult["insult"])