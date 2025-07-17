import mongoose from "mongoose";
import dayjs from "dayjs";

const subscriptionsSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Susbscription name is required"],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, "Subscription price is requried"],
      min: [0, "Price must be greated than 0"],
    },
    currency: {
      type: String,
      enum: ["USD", "EUR", "GBP"],
      default: "USD",
    },
    frequency: {
      type: String,
      enum: ["weekly", "monthly", "quarterly", "yearly"],
    },
    category: {
      type: String,
      enum: [
        "sports",
        "news",
        "entertainment",
        "movies",
        "lifestyle",
        "technology",
        "finance",
        "politics",
        "other",
      ],
      required: true,
    },
    paymentMethod: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      enum: ["active", "cancelled", "expired"],
      default: "active",
    },
    startDate: {
      type: Date,
      required: true,
      validate: {
        // validator: (value) => dayjs(value).isAfter(dayjs()),
        validator: (value) => value <= new Date(),
        message: "Start date must be in the past",
      },
    },
    renewalDate: {
      type: Date,
      validate: {
        validator: function (value) {
          return value > this.startDate;
        },
        message: "Renewal date must be after the start date",
      },
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
  },
  { timestamps: true }
);

// Auto-calculate the renewal date if missing
subscriptionsSchema.pre("save", function (next) {
  if (!this.renewalDate) {
    const renewalPeriods = {
      weekly: 7,
      monthly: 30,
      quarterly: 92,
      yearly: 365,
    };

    this.renewalDate = new Date(this.startDate);
    this.renewalDate.setDate(
      this.renewalDate.getDate() + renewalPeriods[this.frequency]
    );
  }

  // Auto-update the status if renewal date has passed
  if (this.renewalDate < new Date()) {
    this.status = "expired";
  }

  next();
});

const Subscriptions = mongoose.model("Subscription", subscriptionsSchema);

export default Subscriptions;
