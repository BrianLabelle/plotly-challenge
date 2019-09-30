from .app import db


class Belly_Button_Diversity(db.Model):
    __tablename__ = 'Belly_Button_Diversity'



    def __repr__(self):
       return render_template("index.html")
